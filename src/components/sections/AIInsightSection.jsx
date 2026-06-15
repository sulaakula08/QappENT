import { Sparkles, Target, TrendingUp, Lightbulb, RefreshCw, Loader2, Clock, CalendarDays, AlertCircle } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import FadeIn from '../ui/FadeIn'
import { getAIInsight } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'
import { useGeminiInsight } from '../../hooks/useGeminiInsight'
import { UNIVERSITIES } from '../../data/mockData'

function chanceVariant(chance) {
  const c = (chance || '').toLowerCase()
  if (c.includes('high') || c.includes('высок') || c.includes('жоғар')) return 'green'
  if (c.includes('low') || c.includes('низк') || c.includes('төмен')) return 'amber'
  return 'blue'
}

function PlanDayCard({ day, theme, hours, tasks, dayLabel }) {
  return (
    <div className="p-4 rounded-xl border border-gray-100 bg-white hover:border-qapp-blue/25 hover:shadow-card transition-all duration-300">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-qapp-blue text-white text-xs font-bold">
          <CalendarDays className="w-3.5 h-3.5" />
          {dayLabel} {day.day}
        </span>
        {theme && (
          <span className="text-sm font-semibold text-qapp-dark">{theme}</span>
        )}
        {hours && (
          <span className="inline-flex items-center gap-1 text-xs text-qapp-gray ml-auto">
            <Clock className="w-3.5 h-3.5" />
            {hours}h
          </span>
        )}
      </div>
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-qapp-gray leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-qapp-blue mt-2 shrink-0" />
              {task}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-qapp-gray">{day.text || '—'}</p>
      )}
    </div>
  )
}

export default function AIInsightSection({
  currentScore,
  targetScore,
  selectedUniversity,
  selectedProgram,
  selectedProfession,
  subjects,
}) {
  const { t, lang } = useLanguage()
  const { insight: gemini, loading, error, refresh } = useGeminiInsight({
    currentScore,
    targetScore,
    selectedUniversity,
    selectedProgram,
    selectedProfession,
    subjects,
    lang,
  })

  const fallback = getAIInsight(currentScore, selectedUniversity, selectedProgram, subjects, t)
  const uni = UNIVERSITIES.find((u) => u.id === selectedUniversity)
  const program = uni?.programs.find((p) => p.id === selectedProgram)

  if (!fallback) return null

  if (fallback.needsScore) {
    return (
      <section id="ai-insight">
        <div className="w-full">
          <FadeIn>
            <SectionHeader title={t('ai.title')} subtitle={t('ai.subtitle')} />
            <Card padding="p-6" className="animate-shimmer-border">
              <p className="text-sm text-qapp-gray">{fallback.message}</p>
            </Card>
          </FadeIn>
        </div>
      </section>
    )
  }

  const status = gemini?.status || fallback.status
  const chance = gemini?.chance || fallback.chance
  const focus = gemini?.focus || fallback.weakestArea
  const summary = gemini?.summary || fallback.message
  const gapAnalysis = gemini?.gapAnalysis || ''
  const realisticNote = gemini?.realisticNote || ''
  const weeklyPlan = gemini?.weeklyPlan?.length ? gemini.weeklyPlan : null
  const flatPlan = gemini?.plan?.length ? gemini.plan : fallback.plan7Days

  return (
    <section id="ai-insight">
      <div className="w-full">
        <FadeIn>
          <SectionHeader title={t('ai.title')} subtitle={t('ai.subtitle')} />
        </FadeIn>

        <FadeIn delay={120}>
          <Card className="border-qapp-blue/20 relative overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl">
                <div className="flex items-center gap-3 text-qapp-blue animate-fade-in">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-medium">{t('ai.loading')}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-qapp-blue flex items-center justify-center animate-float">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">QApp AI</p>
                <p className="text-sm text-qapp-gray">{uni?.name} · {program?.name}</p>
              </div>
              <Badge variant="green" className="ml-auto animate-scale-in">{status}</Badge>
            </div>

            <p className="text-sm leading-relaxed mb-4 p-4 bg-gradient-to-r from-qapp-blue-light/60 to-white rounded-xl border border-qapp-blue/10">
              {summary}
            </p>

            {(gapAnalysis || realisticNote) && (
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {gapAnalysis && (
                  <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-amber-600" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{t('ai.gapAnalysis')}</p>
                    </div>
                    <p className="text-sm text-qapp-gray leading-relaxed">{gapAnalysis}</p>
                  </div>
                )}
                {realisticNote && (
                  <div className="p-4 rounded-xl border border-blue-100 bg-qapp-blue-light/40">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-qapp-blue" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-qapp-blue">{t('ai.realisticNote')}</p>
                    </div>
                    <p className="text-sm text-qapp-gray leading-relaxed">{realisticNote}</p>
                  </div>
                )}
              </div>
            )}

            {error && (
              <p className="text-xs text-amber-600 mb-4">{t('ai.error')}: {error}</p>
            )}

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Target, label: t('ai.status'), value: status, color: 'text-qapp-blue' },
                { icon: TrendingUp, label: t('ai.chance'), badge: chance },
                { icon: Lightbulb, label: t('ai.improve'), value: focus, color: 'text-amber-500' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="p-4 border border-gray-100 rounded-xl hover:border-qapp-blue/30 hover:shadow-card transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <item.icon className={`w-4 h-4 mb-2 ${item.color || 'text-green-600'}`} />
                  <p className="text-xs text-qapp-gray">{item.label}</p>
                  {item.badge ? (
                    <Badge variant={chanceVariant(chance)} className="mt-1">{item.badge}</Badge>
                  ) : (
                    <p className="font-semibold text-sm mt-1">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <h4 className="font-semibold mb-1">{t('ai.plan7')}</h4>
            <p className="text-xs text-qapp-gray mb-4">{t('ai.plan7hint')}</p>

            {weeklyPlan ? (
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {weeklyPlan.map((day) => (
                  <PlanDayCard
                    key={day.day}
                    day={day}
                    theme={day.theme}
                    hours={day.hours}
                    tasks={day.tasks}
                    dayLabel={t('ai.day')}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2 mb-6">
                {flatPlan.slice(0, 7).map((day, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-qapp-blue-light/40 transition-colors duration-200"
                  >
                    <span className="w-6 h-6 rounded-full bg-qapp-blue-light text-qapp-blue text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-qapp-gray">{day}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={refresh} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {t('ai.refresh')}
              </Button>
              <span className="text-xs text-qapp-gray">{t('ai.powered')}</span>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
