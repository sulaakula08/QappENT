import { useMemo } from 'react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Button from '../ui/Button'
import InputField from '../ui/InputField'
import { SUBJECT_INSIGHTS, WEAK_TOPICS } from '../../data/mockData'
import { getPriorityColor } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

export default function ScoreBreakdownSection({ subjects, onSubjectChange }) {
  const { t } = useLanguage()

  const insights = useMemo(() =>
    subjects
      .filter((s) => s.current > 0)
      .map((sub) => {
        const insight = SUBJECT_INSIGHTS[sub.id]
        const pct = Math.round((sub.current / sub.maxScore) * 100)
        let priority = 'Low'
        if (pct < 50) priority = 'High'
        else if (pct < 70) priority = 'Medium'
        return { ...sub, insight, priority, pct }
      })
      .sort((a, b) => a.pct - b.pct),
  [subjects])

  return (
    <section id="breakdown" className="py-14 sm:py-20 border-t border-gray-100">
      <div className="container-qapp">
        <SectionHeader title={t('breakdown.title')} subtitle={t('breakdown.subtitle')} />

        <p className="text-sm text-qapp-gray mb-4">{t('common.enterScoreHint')}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {subjects.filter((s) => s.type === 'mandatory' || ['math', 'physics'].includes(s.id)).map((sub) => (
            <InputField
              key={sub.id}
              label={`${t(`subjects.${sub.id}`)} (${t('breakdown.max')} ${sub.maxScore})`}
              type="number"
              value={sub.current || ''}
              onChange={(v) => onSubjectChange(sub.id, v === '' ? '' : v)}
              min={0}
              max={sub.maxScore}
            />
          ))}
        </div>

        <div className="space-y-4 mb-8">
          {insights.map((item) => (
            <Card key={item.id} padding="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{t(`subjects.${item.id}`)}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(item.priority)}`}>{item.priority}</span>
                  </div>
                  <p className="text-sm text-qapp-gray mt-1">{item.current}/{item.maxScore} · {item.pct}%</p>
                </div>
                {item.insight && <Button size="sm" variant="outline">{t('breakdown.nextStep')}</Button>}
              </div>
              {item.insight ? (
                <>
                  <p className="text-sm leading-relaxed">{item.insight.advice}</p>
                  <p className="text-xs text-qapp-blue mt-2 font-medium">→ {item.insight.nextStep}</p>
                </>
              ) : (
                <p className="text-sm text-qapp-gray">{t('breakdown.addScores')}</p>
              )}
            </Card>
          ))}
        </div>

        <Card padding="p-0" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray">{t('breakdown.subject')}</th>
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray">{t('breakdown.weakTopic')}</th>
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray hidden md:table-cell">{t('breakdown.recommendation')}</th>
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray">{t('breakdown.priority')}</th>
                </tr>
              </thead>
              <tbody>
                {WEAK_TOPICS.map((item, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3.5 font-medium">{item.subject}</td>
                    <td className="px-5 py-3.5">{item.topic}</td>
                    <td className="px-5 py-3.5 text-qapp-gray hidden md:table-cell">{item.recommendation}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(item.priority)}`}>{item.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  )
}
