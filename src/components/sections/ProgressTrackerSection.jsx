import { Flame, ListChecks } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import Badge from '../ui/Badge'
import MiniChart from '../ui/MiniChart'
import AnimatedNumber from '../ui/AnimatedNumber'
import FadeIn from '../ui/FadeIn'
import { USER_PROFILE } from '../../data/mockData'
import { calcReadiness, getGap, hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

export default function ProgressTrackerSection({ currentScore, targetScore, subjects }) {
  const { t } = useLanguage()
  const scoreEntered = hasEnteredScore(currentScore)
  const readiness = calcReadiness(currentScore, targetScore)
  const gap = getGap(currentScore, targetScore)
  const activeSubjects = subjects.filter((s) => s.current > 0)

  const chartData = activeSubjects.slice(0, 5).map((s) => ({
    label: t(`subjects.${s.id}`).split(' ')[0],
    value: Math.round((s.current / s.maxScore) * 100),
    color: s.current / s.maxScore >= 0.7 ? 'bg-green-500' : s.current / s.maxScore >= 0.5 ? 'bg-amber-500' : 'bg-red-500',
  }))

  return (
    <section id="progress" className="py-14 sm:py-20 border-t border-gray-100">
      <div className="container-qapp">
        <SectionHeader title={t('progress.title')} subtitle={t('progress.subtitle')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: t('progress.currentScore'), num: scoreEntered ? currentScore : null, accent: 'text-qapp-dark' },
            { label: t('progress.targetScore'), num: targetScore, accent: 'text-qapp-blue' },
            { label: t('progress.gapPts'), num: scoreEntered ? gap : null, suffix: ' pts', accent: 'text-amber-600' },
            { label: t('common.readiness'), num: scoreEntered ? readiness : null, suffix: '%', accent: 'text-green-600' },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 80}>
              <Card padding="p-5" hover>
                <p className="text-xs font-medium text-qapp-gray uppercase tracking-wide">{s.label}</p>
                <AnimatedNumber
                  value={s.num}
                  suffix={s.suffix || ''}
                  className={`text-3xl font-bold mt-2 block ${s.accent}`}
                />
              </Card>
            </FadeIn>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <h3 className="font-semibold mb-5">{t('progress.subjectBreakdown')}</h3>
            {activeSubjects.length > 0 ? (
              <>
                <div className="space-y-4 mb-8">
                  {activeSubjects.map((sub) => {
                    const pct = Math.round((sub.current / sub.maxScore) * 100)
                    return (
                      <div key={sub.id}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium">{t(`subjects.${sub.id}`)}</span>
                          <span className="text-qapp-gray">{pct}% · {sub.current}/{sub.maxScore}</span>
                        </div>
                        <ProgressBar value={sub.current} max={sub.maxScore} color={pct >= 70 ? 'green' : pct >= 50 ? 'amber' : 'red'} />
                      </div>
                    )
                  })}
                </div>
                {chartData.length > 0 && <MiniChart data={chartData} />}
              </>
            ) : (
              <p className="text-sm text-qapp-gray">{t('breakdown.addScores')}</p>
            )}
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{USER_PROFILE.streak}</p>
                  <p className="text-xs text-qapp-gray">{t('progress.streak')}</p>
                </div>
              </div>
              <div className="mt-3"><Badge variant="amber">{t('progress.keepUp')}</Badge></div>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <ListChecks className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{USER_PROFILE.completedTasks}/{USER_PROFILE.totalTasks}</p>
                  <p className="text-xs text-qapp-gray">{t('progress.tasks')}</p>
                </div>
              </div>
              <ProgressBar value={USER_PROFILE.completedTasks} max={USER_PROFILE.totalTasks} color="green" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
