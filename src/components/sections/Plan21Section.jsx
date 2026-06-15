import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { PLAN_21_DAYS } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

export default function Plan21Section() {
  const { t } = useLanguage()
  const [generated, setGenerated] = useState(false)

  return (
    <section id="plan-21">
      <div className="w-full">
        <SectionHeader title={t('plan21.title')} subtitle={t('plan21.subtitle')} />

        <div className="flex gap-3 mb-10 items-center">
          <Button onClick={() => setGenerated(true)}>
            <Sparkles className="w-4 h-4 mr-2" />
            {t('plan21.generate')}
          </Button>
          {generated && <span className="text-sm text-green-600 font-medium">{t('plan21.generated')}</span>}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLAN_21_DAYS.map((week) => (
            <Card key={week.week} className="relative">
              <div className="absolute -top-3 left-6 bg-qapp-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                {t('plan21.week')} {week.week}
              </div>
              <h3 className="font-semibold mt-3 mb-4">{week.title}</h3>
              <ul className="space-y-3">
                {week.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-qapp-gray">
                    <span className={`w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center shrink-0 ${generated ? 'bg-qapp-blue text-white' : 'bg-gray-100'}`}>
                      {i + 1}
                    </span>
                    {task}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
