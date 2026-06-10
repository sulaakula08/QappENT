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
    .map((s) => `${s.name}: ${s.current}/${s.maxScore}`)
    .join(', ')

  return {
    score: currentScore,
    target: targetScore,
    university: uni?.name,
    program: program?.name,
    minPaid: program?.minPaidScore,
    avgGrant: program?.avgGrantScore,
    profession: professionId,
    subjects: subjectLines || 'not provided',
    weak: weak.map((s) => s.name).join(', ') || 'unknown',
    lang: LANG_LABEL[lang] || 'Russian',
  }
}

async function callGemini(prompt, maxTokens = 280) {
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
          temperature: 0.4,
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

export async function fetchENTInsight(context) {
  const prompt = `You are QApp ENT admission coach for Kazakhstan universities.
Reply ONLY in ${context.lang}. Be very brief — no fluff, max 80 words total.

Student ENT score: ${context.score}/140
Target score: ${context.target}
University: ${context.university}
Program: ${context.program}
Paid min: ${context.minPaid}, Grant avg: ${context.avgGrant}
Subject scores: ${context.subjects}
Weakest areas: ${context.weak}

Format EXACTLY like this (keep each line short):
STATUS: [one short phrase]
CHANCE: [High/Medium/Low]
FOCUS: [one weak area]
SUMMARY: [max 2 short sentences]
PLAN:
- [day 1]
- [day 2]
- [day 3]`

  const { text } = await callGemini(prompt, 280)
  return parseInsightResponse(text)
}

function parseInsightResponse(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  const result = {
    status: 'On track',
    chance: 'Medium',
    focus: '',
    summary: '',
    plan: [],
    raw: text,
  }

  for (const line of lines) {
    if (line.startsWith('STATUS:')) result.status = line.replace('STATUS:', '').trim()
    else if (line.startsWith('CHANCE:')) result.chance = line.replace('CHANCE:', '').trim()
    else if (line.startsWith('FOCUS:')) result.focus = line.replace('FOCUS:', '').trim()
    else if (line.startsWith('SUMMARY:')) result.summary = line.replace('SUMMARY:', '').trim()
    else if (line.startsWith('- ')) result.plan.push(line.replace('- ', '').trim())
    else if (line.startsWith('PLAN:')) { /* skip */ }
    else if (!result.summary) result.summary += (result.summary ? ' ' : '') + line
    else if (result.plan.length < 5 && line.length < 80) result.plan.push(line)
  }

  if (!result.summary && text) result.summary = text.slice(0, 200)
  if (result.plan.length === 0) {
    result.plan = ['Focus on weakest subject', 'Daily timed practice', 'Review mistakes']
  }

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
