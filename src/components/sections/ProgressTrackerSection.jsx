import { Flame, ListChecks } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import Badge from '../ui/Badge'
import MiniChart from '../ui/MiniChart'
import { USER_PROFILE } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

export default function ProgressTrackerSection({ subjects }) {
  const { t } = useLanguage()
  const activeSubjects = subjects.filter((s) => s.current > 0)

  const chartData = activeSubjects.slice(0, 5).map((s) => ({
    label: t(`subjects.${s.id}`).split(' ')[0],
    value: Math.round((s.current / s.maxScore) * 100),
    color: s.current / s.maxScore >= 0.7 ? 'bg-green-500' : s.current / s.maxScore >= 0.5 ? 'bg-amber-500' : 'bg-red-500',
  }))

  return (
    <section id="progress">
      <div className="w-full">
        <SectionHeader title={t('progress.title')} subtitle={t('progress.subtitle')} />

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
