import { ENT_DATE, UNIVERSITIES, PROFESSIONS, SUBJECT_INSIGHTS } from '../data/mockData'
import { interpolate } from '../i18n/translations'

export function getDaysUntil(targetDate) {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return { days, hours, minutes }
}

export function hasEnteredScore(score) {
  return score !== null && score !== undefined && score !== ''
}

export function getEffectiveScore(score) {
  return hasEnteredScore(score) ? Number(score) : 0
}

export function calcReadiness(current, target) {
  if (!target || !hasEnteredScore(current)) return 0
  return Math.min(100, Math.round((Number(current) / target) * 100))
}

export function getQualifyStatus(userScore, minPaid, grant, t) {
  const score = getEffectiveScore(userScore)
  if (!hasEnteredScore(userScore)) {
    return { status: 'none', label: '—', color: 'default', detail: '' }
  }
  if (score >= grant) return { status: 'grant', label: t('status.grant'), color: 'green' }
  if (score >= minPaid) return { status: 'paid', label: t('status.paid'), color: 'blue' }
  return { status: 'gap', label: t('status.gap'), color: 'amber' }
}

export function getDetailedStatus(userScore, program, t) {
  const score = getEffectiveScore(userScore)
  if (!hasEnteredScore(userScore)) return t('common.enterScoreHint')
  const grantGap = program.avgGrantScore - score
  const paidGap = program.minPaidScore - score
  if (score >= program.avgGrantScore) {
    return t('universities.exceedGrant', { program: program.name })
  }
  if (score >= program.minPaidScore) {
    return t('universities.meetPaidNeedGrant', { gap: grantGap })
  }
  return t('universities.needPaidAndGrant', { paidGap, grantGap })
}

export function getGap(userScore, target) {
  if (!hasEnteredScore(userScore)) return 0
  return Math.max(0, target - Number(userScore))
}

export function calcWeeklyTarget(current, target, daysLeft) {
  const score = getEffectiveScore(current)
  const gap = getGap(current, target)
  const weeks = Math.max(1, Math.ceil(daysLeft / 7))
  const perWeek = hasEnteredScore(current) ? Math.ceil((gap / weeks) * 10) / 10 : 0
  return { gap, weeks, perWeek, score }
}

export function getPlannerMessage(current, target, hoursPerDay, t) {
  const { days } = getDaysUntil(ENT_DATE)
  if (!hasEnteredScore(current)) {
    return { days, gap: 0, perWeek: 0, message: t('planner.enterScore') }
  }
  const { gap, perWeek, score } = calcWeeklyTarget(current, target, days)
  return {
    days,
    gap,
    perWeek,
    message: t('planner.message', { days, current: score, target, perWeek, hours: hoursPerDay }),
  }
}

export function detectWeakSubjects(subjects, threshold = 0.7) {
  return subjects
    .filter((s) => s.current > 0 && s.current / s.maxScore < threshold)
    .sort((a, b) => a.current / a.maxScore - b.current / b.maxScore)
}

export function getWeakestSubject(subjects) {
  const weak = detectWeakSubjects(subjects)
  return weak[0] || subjects.find((s) => s.type === 'profile' && s.current > 0)
}

export function getPriorityColor(priority) {
  const map = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-amber-100 text-amber-700',
    Low: 'bg-green-100 text-green-700',
    'Very High': 'bg-red-100 text-red-800',
  }
  return map[priority] || 'bg-gray-100 text-gray-700'
}

export function getMatchingSummary(professionId, currentScore, t) {
  const profession = PROFESSIONS.find((p) => p.id === professionId)
  if (!profession) return { text: '', paidCount: 0, grantCount: 0, total: 0 }
  if (!hasEnteredScore(currentScore)) {
    return { text: t('common.enterScoreHint'), paidCount: 0, grantCount: 0, total: 0 }
  }
  const score = Number(currentScore)
  const matches = profession.universities.map((uid) => {
    const uni = UNIVERSITIES.find((u) => u.id === uid)
    const bestProgram = uni?.programs[0]
    if (!bestProgram) return null
    return getQualifyStatus(currentScore, bestProgram.minPaidScore, bestProgram.avgGrantScore, t)
  }).filter(Boolean)

  const paidCount = matches.filter((m) => m.status === 'paid' || m.status === 'grant').length
  const grantCount = matches.filter((m) => m.status === 'grant').length
  const total = matches.length
  const grantGap = Math.max(0, profession.recommendedScore + 15 - score)

  return {
    text: t('matching.summary', {
      profession: profession.nameRu,
      score,
      paid: paidCount,
      total,
      gap: grantGap,
    }),
    paidCount,
    grantCount,
    total,
  }
}

export function getAIInsight(currentScore, universityId, programId, subjects, t) {
  const uni = UNIVERSITIES.find((u) => u.id === universityId)
  const program = uni?.programs.find((p) => p.id === programId) || uni?.programs[0]
  const weakest = getWeakestSubject(subjects)
  if (!program) return null

  if (!hasEnteredScore(currentScore)) {
    return { needsScore: true, message: t('common.enterScoreHint') }
  }

  const score = Number(currentScore)
  const grantGap = Math.max(0, program.avgGrantScore - score)
  const paidAbove = score >= program.avgPaidScore
  const insight = SUBJECT_INSIGHTS[weakest?.id] || SUBJECT_INSIGHTS.physics
  const focus = insight.focus

  let status = t('ai.onTrack')
  let chance = t('common.medium')
  if (score >= program.avgGrantScore) { status = t('ai.grantReady'); chance = t('common.high') }
  else if (score >= program.minPaidScore) { status = t('ai.paidCompetitive'); chance = t('common.medium') }
  else { status = t('ai.needsImprovement'); chance = t('common.low') }

  const weakestName = weakest ? (t(`subjects.${weakest.id}`) || weakest.name) : t('subjects.physics')

  return {
    status,
    chance,
    university: uni.name,
    program: program.name,
    grantGap,
    paidAbove,
    weakestArea: `${weakestName} — ${focus}`,
    message: paidAbove
      ? t('ai.abovePaid', { paid: program.avgPaidScore, grant: program.avgGrantScore, gap: grantGap, focus })
      : t('ai.needPaid', { gap: program.minPaidScore - score, focus }),
    plan7Days: [
      `${t('ai.day')} 1–2: ${weakestName} — ${focus}`,
      `${t('ai.day')} 3: Timed practice (40 min)`,
      `${t('ai.day')} 4–5: High-frequency topics`,
      `${t('ai.day')} 6: Full mock test`,
      `${t('ai.day')} 7: Review mistakes`,
    ],
  }
}

export function updateSubjectScores(subjects, updates) {
  return subjects.map((s) => {
    if (updates[s.id] !== undefined) {
      const val = updates[s.id]
      const current = val === '' || val === null ? 0 : Math.min(s.maxScore, Math.max(0, Number(val)))
      return { ...s, current, pct: current > 0 ? Math.round((current / s.maxScore) * 100) : 0 }
    }
    return s
  })
}

export function initSubjects(subjects) {
  return subjects.map((s) => ({ ...s, current: 0, pct: 0 }))
}
