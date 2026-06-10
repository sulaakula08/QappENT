import { Check } from 'lucide-react'
import StepColumn from '../ui/StepColumn'
import Card from '../ui/Card'
import Button from '../ui/Button'
import StatusTimeline from '../ui/StatusTimeline'
import AnimatedNumber from '../ui/AnimatedNumber'
import FadeIn from '../ui/FadeIn'
import { calcReadiness, hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

const SELECTED_UNIS = [
  { id: 'mnu', name: 'Nazarbayev University', program: 'Computer Science', city: 'Астана', color: 'bg-blue-600' },
  { id: 'kimep', name: 'KIMEP University', program: 'Business Administration', city: 'Алматы', color: 'bg-red-600' },
  { id: 'kbtu', name: 'KBTU', program: 'Software Engineering', city: 'Алматы', color: 'bg-slate-800' },
]

export default function StepsSection({ currentScore, targetScore, onScoreChange, subjects }) {
  const { t } = useLanguage()
  const readiness = calcReadiness(currentScore, targetScore)
  const scoreEntered = hasEnteredScore(currentScore)
  const activeSubjects = subjects.filter((s) => s.current > 0)

  const PREP_TIMELINE = [
    { label: t('timeline.diag'), date: '10 мая', state: 'done' },
    { label: t('timeline.plan'), date: '18 мая', state: 'done' },
    { label: t('timeline.mock'), date: '5 июн', state: 'current' },
    { label: t('timeline.ent'), date: t('timeline.entPending'), state: 'pending' },
  ]

  return (
    <section id="steps" className="py-14 sm:py-20 lg:py-24 border-t border-gray-100">
      <div className="container-qapp">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 xl:gap-16">
          <FadeIn delay={0}><StepColumn step="01" title={t('steps.s1title')} description={t('steps.s1desc')}>
            <Card padding="p-5 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-qapp-gray">{t('common.current')}</span>
                  <input
                    type="number"
                    min="0"
                    max="140"
                    value={currentScore ?? ''}
                    placeholder="—"
                    onChange={(e) => onScoreChange(e.target.value === '' ? '' : Number(e.target.value))}
                    className="text-sm font-semibold text-qapp-dark text-right w-20 bg-transparent focus:outline-none border-b border-gray-200 focus:border-qapp-blue"
                  />
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-qapp-gray">{t('common.target')}</span>
                  <span className="text-sm font-semibold text-qapp-dark">{targetScore}</span>
                </div>
                {activeSubjects.length > 0 ? activeSubjects.slice(0, 3).map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between py-1">
                    <span className="text-sm text-qapp-gray">{t(`subjects.${sub.id}`)}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{sub.current}/{sub.maxScore}</span>
                      {sub.current / sub.maxScore >= 0.6 && <Check className="w-4 h-4 text-qapp-blue" strokeWidth={2.5} />}
                    </div>
                  </div>
                )) : (
                  <p className="text-xs text-qapp-gray">{t('breakdown.addScores')}</p>
                )}
              </div>
              <div className="mt-5">
                <Button variant="pill" size="md" className="w-full">
                  {scoreEntered ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <AnimatedNumber value={currentScore} className="font-semibold" />
                      {t('steps.readiness')}
                      <AnimatedNumber value={readiness} suffix="%" className="font-semibold" />
                    </span>
                  ) : t('common.scorePlaceholder')}
                </Button>
              </div>
            </Card>
          </StepColumn></FadeIn>

          <FadeIn delay={120}><StepColumn step="02" title={t('steps.s2title')} description={t('steps.s2desc')}>
            <Card padding="p-0" className="overflow-hidden">
              {SELECTED_UNIS.map((uni, i) => (
                <div key={uni.id} className={`flex items-center gap-3 px-5 py-4 ${i < SELECTED_UNIS.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className={`w-9 h-9 rounded-lg ${uni.color} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-[10px] font-bold">{uni.name.slice(0, 4)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{uni.name}</p>
                    <p className="text-xs text-qapp-gray">{uni.program}</p>
                  </div>
                  <span className="text-sm text-qapp-blue font-medium shrink-0">{uni.city}</span>
                </div>
              ))}
            </Card>
          </StepColumn></FadeIn>

          <FadeIn delay={240}><StepColumn step="03" title={t('steps.s3title')} description={t('steps.s3desc')}>
            <Card padding="p-5 sm:p-6">
              <StatusTimeline items={PREP_TIMELINE} />
            </Card>
          </StepColumn></FadeIn>
        </div>
      </div>
    </section>
  )
}
