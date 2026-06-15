import { UNIVERSITIES } from '../data/mockData'

const MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3-flash-preview',
  'gemini-2.5-flash',
]

const LANG_LABEL = { ru: 'Russian', kk: 'Kazakh', en: 'English' }

function getApiKey() {
  return import.meta.env.VITE_GEMINI_API_KEY
}

export function buildENTContext({ currentScore, targetScore, universityId, programId, professionId, subjects, lang }) {
  const uni = UNIVERSITIES.find((u) => u.id === universityId)
  const program = uni?.programs.find((p) => p.id === programId) || uni?.programs[0]
  const weak = subjects.filter((s) => s.current > 0 && s.current / s.maxScore < 0.65)
  const subjectLines = subjects
    .filter((s) => s.current > 0)
    .map((s) => `${s.name}: ${s.current}/${s.maxScore} (${Math.round((s.current / s.maxScore) * 100)}%)`)
    .join(', ')

  const score = Number(currentScore)
  const grantGap = program ? Math.max(0, program.avgGrantScore - score) : 0
  const paidGap = program ? Math.max(0, program.minPaidScore - score) : 0
  const targetGap = Math.max(0, targetScore - score)

  return {
    score: currentScore,
    target: targetScore,
    university: uni?.name,
    program: program?.name,
    minPaid: program?.minPaidScore,
    avgPaid: program?.avgPaidScore,
    avgGrant: program?.avgGrantScore,
    grantGap,
    paidGap,
    targetGap,
    profession: professionId,
    subjects: subjectLines || 'not provided',
    weak: weak.map((s) => `${s.name} (${s.current}/${s.maxScore})`).join(', ') || 'unknown',
    lang: LANG_LABEL[lang] || 'Russian',
  }
}

async function callGeminiDirect(prompt, maxTokens) {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('Missing VITE_GEMINI_API_KEY')

  let lastError = null

  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.55,
          maxOutputTokens: maxTokens,
        },
      }),
    })

    if (res.ok) {
      const data = await res.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
      if (text) return { text, model }
    } else {
      const err = await res.json().catch(() => ({}))
      lastError = new Error(err?.error?.message || `Gemini API error ${res.status}`)
    }
  }

  throw lastError || new Error('Gemini API unavailable')
}

async function callGeminiViaProxy(prompt, maxTokens) {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, maxOutputTokens: maxTokens }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.error || `Server error ${res.status}`)
  }
  if (!data?.text) throw new Error('Empty response from AI server')
  return { text: data.text, model: data.model }
}

async function callGemini(prompt, maxTokens = 1024) {
  if (import.meta.env.PROD) {
    return callGeminiViaProxy(prompt, maxTokens)
  }
  return callGeminiDirect(prompt, maxTokens)
}

export async function fetchENTInsight(context) {
  const prompt = `You are an experienced ENT (ЕНТ) admission coach in Kazakhstan. Reply ONLY in ${context.lang}.

STUDENT DATA:
- Current ENT score: ${context.score}/140
- Target score: ${context.target}/140
- Gap to target: ${context.targetGap} points
- University: ${context.university}
- Program: ${context.program}
- Paid minimum: ${context.minPaid}, Paid average: ${context.avgPaid}, Grant average: ${context.avgGrant}
- Gap to paid minimum: ${context.paidGap} points
- Gap to grant competitiveness: ${context.grantGap} points
- Subject breakdown: ${context.subjects}
- Weakest subjects: ${context.weak}

RULES FOR REALISM:
- ENT max is 140. Typical realistic weekly gain with 2–3h/day study is 3–7 points, not 20+.
- Be honest if grant/paid gap is large — suggest phased goals (paid first, then grant).
- Plans must include concrete tasks: topics, timed tests, mistake review, not vague advice.
- Adapt hours to gap size: small gap = 2h/day, medium = 2.5–3h, large = 3–4h with rest day.
- Reference Kazakhstan ENT format: literacy tests + profile subjects + history.

OUTPUT FORMAT (follow exactly):

STATUS: [short status vs ${context.university} ${context.program}]
CHANCE: [High/Medium/Low — for grant admission]
FOCUS: [weakest subject + specific topic area]
GAP_ANALYSIS: [2–3 sentences: current position, paid/grant gaps, realistic weekly point gain estimate]
REALISTIC_NOTE: [1–2 honest sentences: what is achievable in 7 days and what needs longer]
SUMMARY: [3–4 sentences: overall assessment and priority strategy]

DAY1:
THEME: [focus area]
HOURS: [number, e.g. 2.5]
TASKS:
- [specific task with duration, e.g. "Physics: mechanics — 20 MCQ timed 25 min"]
- [specific task]
- [specific task]

DAY2:
THEME: ...
HOURS: ...
TASKS:
- ...
(repeat DAY3 through DAY7 with varied realistic tasks: theory, timed practice, mock sections, error log, light review/rest on day 7)`

  const { text } = await callGemini(prompt, 1200)
  return parseInsightResponse(text)
}

function parseDayHeader(line) {
  return line.match(/^DAY\s*(\d+)\s*:?\s*$/i)
    || line.match(/^DAY\s*(\d+)\s*:/i)
    || line.match(/^ДЕНЬ\s*(\d+)\s*:?\s*$/i)
    || line.match(/^ДЕНЬ\s*(\d+)\s*:/i)
    || line.match(/^КҮН\s*(\d+)\s*:?\s*$/i)
    || line.match(/^КҮН\s*(\d+)\s*:/i)
}

function parseInsightResponse(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  const result = {
    status: 'On track',
    chance: 'Medium',
    focus: '',
    summary: '',
    gapAnalysis: '',
    realisticNote: '',
    weeklyPlan: [],
    plan: [],
    raw: text,
  }

  let currentDay = null
  let inTasks = false

  const flushDay = () => {
    if (currentDay) {
      result.weeklyPlan.push(currentDay)
      currentDay = null
      inTasks = false
    }
  }

  for (const line of lines) {
    const dayMatch = parseDayHeader(line)
    if (dayMatch) {
      flushDay()
      currentDay = { day: Number(dayMatch[1]), theme: '', hours: '', tasks: [] }
      continue
    }

    if (line.startsWith('STATUS:')) result.status = line.replace(/^STATUS:\s*/i, '').trim()
    else if (line.startsWith('CHANCE:')) result.chance = line.replace(/^CHANCE:\s*/i, '').trim()
    else if (line.startsWith('FOCUS:')) result.focus = line.replace(/^FOCUS:\s*/i, '').trim()
    else if (line.startsWith('GAP_ANALYSIS:') || line.startsWith('GAP:')) {
      result.gapAnalysis = line.replace(/^(GAP_ANALYSIS|GAP):\s*/i, '').trim()
    }
    else if (line.startsWith('REALISTIC_NOTE:') || line.startsWith('REALISTIC:')) {
      result.realisticNote = line.replace(/^(REALISTIC_NOTE|REALISTIC):\s*/i, '').trim()
    }
    else if (line.startsWith('SUMMARY:')) result.summary = line.replace(/^SUMMARY:\s*/i, '').trim()
    else if (currentDay) {
      if (line.startsWith('THEME:')) {
        currentDay.theme = line.replace(/^THEME:\s*/i, '').trim()
        inTasks = false
      } else if (line.startsWith('HOURS:')) {
        currentDay.hours = line.replace(/^HOURS:\s*/i, '').trim()
        inTasks = false
      } else if (line.startsWith('TASKS:')) {
        inTasks = true
      } else if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
        currentDay.tasks.push(line.replace(/^[-•*]\s*/, '').trim())
      } else if (inTasks && line.length > 10) {
        currentDay.tasks.push(line)
      }
    } else if (line.startsWith('- ')) {
      result.plan.push(line.replace('- ', '').trim())
    }
  }

  flushDay()

  if (!result.summary && text) result.summary = text.slice(0, 400)

  if (result.weeklyPlan.length > 0) {
    result.plan = result.weeklyPlan.map((d) => {
      const tasks = d.tasks.length ? d.tasks.join('; ') : 'Practice and review'
      const hours = d.hours ? `, ${d.hours}h` : ''
      return d.theme ? `${d.theme}${hours}: ${tasks}` : tasks
    })
  }

  if (result.plan.length === 0) {
    result.plan = [
      'Day 1–2: Weakest subject theory + 20 timed MCQ',
      'Day 3: Mixed practice 40 min + error log',
      'Day 4–5: High-frequency ENT topics',
      'Day 6: Partial mock test (profile subjects)',
      'Day 7: Review mistakes, light recap',
    ]
  }

  result.weeklyPlan.sort((a, b) => a.day - b.day)

  return result
}

export async function fetchFAQAnswer({ question, lang, score, target }) {
  const prompt = `QApp ENT coach. Reply in ${LANG_LABEL[lang] || 'Russian'}.
Student score: ${score ?? 'not set'}/140, target: ${target}.
Question: ${question}
Answer in max 3 short sentences. Be practical.`

  const { text } = await callGemini(prompt, 150)
  return text.trim()
}
