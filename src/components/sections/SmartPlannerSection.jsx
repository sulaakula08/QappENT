import { Calendar, Bell, Target, AlertTriangle, BookOpen, CheckCircle2, Circle } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import InputField from '../ui/InputField'
import Select from '../ui/Select'
import { PLANNER_TASKS, PROFILE_COMBOS } from '../../data/mockData'
import { getPlannerMessage, getWeakestSubject, detectWeakSubjects, hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

export default function SmartPlannerSection({
  currentScore, targetScore, hoursPerDay, onHoursChange, profileCombo, onProfileComboChange, subjects,
}) {
  const { t } = useLanguage()
  const planner = getPlannerMessage(currentScore, targetScore, hoursPerDay, t)
  const weakest = getWeakestSubject(subjects)
  const weakList = detectWeakSubjects(subjects)
  const scoreEntered = hasEnteredScore(currentScore)

  const plannerCards = [
    { icon: Target, title: t('planner.todayFocus'), value: weakest ? `${t(`subjects.${weakest.id}`)}: 20` : '—', color: 'text-qapp-blue' },
    { icon: Calendar, title: t('planner.weekGoal'), value: scoreEntered ? `+${planner.perWeek}` : '—', color: 'text-green-600' },
    { icon: AlertTriangle, title: t('planner.weakest'), value: weakest ? t(`subjects.${weakest.id}`) : '—', color: 'text-amber-600' },
    { icon: BookOpen, title: t('planner.recommended'), value: 'Timed mock · 40 min', color: 'text-purple-600' },
    { icon: Bell, title: t('planner.reminder'), value: 'Mock · Sat 10:00', color: 'text-qapp-gray' },
  ]

  return (
    <section id="planner">
      <div className="w-full">
        <SectionHeader title={t('planner.title')} subtitle={t('planner.subtitle')} />

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <h3 className="font-semibold mb-4">{t('planner.settings')}</h3>
            <div className="space-y-4">
              <InputField label={t('planner.hoursDay')} type="number" value={hoursPerDay} onChange={onHoursChange} min={1} max={12} suffix="ч" />
              <Select
                label={t('planner.profileSubjects')}
                value={profileCombo}
                onChange={onProfileComboChange}
                options={PROFILE_COMBOS.map((c) => ({ value: c.id, label: t(`profileCombos.${c.id}`) }))}
              />
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-qapp-blue-light flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-qapp-blue" />
              </div>
              <div>
                <h3 className="font-semibold">{t('planner.auto')}</h3>
                <p className="text-sm text-qapp-gray mt-1 leading-relaxed">{planner.message}</p>
              </div>
            </div>
            {scoreEntered && (
              <Badge variant="blue" className="mb-6">{t('planner.weeklyTarget')}: +{planner.perWeek}</Badge>
            )}

            <div className="grid grid-cols-7 gap-2 mb-6">
              {PLANNER_TASKS.calendar.map((day) => (
                <div key={day.day} className={`text-center p-2 rounded-xl border ${day.active ? 'border-qapp-blue bg-qapp-blue-light' : 'border-gray-100'}`}>
                  <p className="text-xs font-medium">{day.day}</p>
                  <p className="text-lg font-bold mt-1">{day.done}/{day.tasks}</p>
                </div>
              ))}
            </div>

            <h4 className="font-medium text-sm mb-3">{t('planner.todayTasks')}</h4>
            <div className="space-y-2">
              {PLANNER_TASKS.daily.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                  {task.done ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-gray-300" />}
                  <div>
                    <p className={`text-sm ${task.done ? 'line-through text-gray-400' : 'font-medium'}`}>{task.task}</p>
                    <p className="text-xs text-qapp-gray">{task.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {plannerCards.map((card) => (
            <Card key={card.title} padding="p-4">
              <card.icon className={`w-5 h-5 ${card.color} mb-2`} />
              <p className="text-xs text-qapp-gray">{card.title}</p>
              <p className="text-sm font-semibold mt-1">{card.value}</p>
            </Card>
          ))}
        </div>

        {scoreEntered && weakList.length > 0 && (
          <Card className="mt-6" padding="p-5">
            <p className="text-sm font-medium mb-3">{t('planner.weekProgress')}</p>
            <div className="flex gap-4">
              {[64, 78, 91].map((pct, i) => (
                <div key={i} className="flex-1">
                  <div className="flex justify-between text-xs text-qapp-gray mb-1">
                    <span>{t('plan21.week')} {i + 1}</span><span>{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-qapp-blue rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
