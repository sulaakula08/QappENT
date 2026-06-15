import { BookOpen, Clock, Award } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Accordion from '../ui/Accordion'
import Badge from '../ui/Badge'
import { EXAM_FORMAT, SUBJECTS } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

export default function ExamFormatSection() {
  const { t, lang } = useLanguage()
  const mandatory = SUBJECTS.filter((s) => s.type === 'mandatory')
  const profile = SUBJECTS.filter((s) => s.type === 'profile')

  const structureTitles = {
    ru: ['Обязательные предметы', 'Профильные предметы', 'Система оценивания'],
    kk: ['Міндетті пәндер', 'Профиль пәндері', 'Бағалау жүйесі'],
    en: ['Mandatory subjects', 'Profile subjects', 'Scoring system'],
  }
  const structure = EXAM_FORMAT.structure.map((item, i) => ({
    title: structureTitles[lang]?.[i] || item.title,
    items: item.items,
  }))

  return (
    <section id="format">
      <div className="w-full">
        <SectionHeader title={t('format.title')} subtitle={t('format.subtitle')} />

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Clock, label: t('format.duration'), value: EXAM_FORMAT.totalDuration },
            { icon: Award, label: t('format.maxScore'), value: `${EXAM_FORMAT.maxScore}` },
            { icon: BookOpen, label: t('format.structure'), value: '3 + 2' },
          ].map((stat) => (
            <Card key={stat.label} padding="p-5" className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-qapp-blue-light flex items-center justify-center shrink-0">
                <stat.icon className="w-5 h-5 text-qapp-blue" />
              </div>
              <div>
                <p className="text-xs text-qapp-gray">{stat.label}</p>
                <p className="font-semibold">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold mb-4">{t('format.mandatory')}</h3>
            <div className="space-y-2">
              {mandatory.map((sub) => (
                <Card key={sub.id} padding="p-4" hover>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{t(`subjects.${sub.id}`)}</p>
                      <p className="text-xs text-qapp-gray">{sub.questions} {t('format.questions')} · {sub.duration}</p>
                    </div>
                    <Badge variant="blue">{t('format.upTo')} {sub.maxScore} {t('format.ptsShort')}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('format.profile')}</h3>
            <div className="space-y-2">
              {profile.map((sub) => (
                <Card key={sub.id} padding="p-4" hover>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{t(`subjects.${sub.id}`)}</p>
                      <p className="text-xs text-qapp-gray">{sub.questions} {t('format.questions')} · {sub.duration}</p>
                    </div>
                    <Badge variant="purple">{t('format.upTo')} {sub.maxScore} {t('format.ptsShort')}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <h3 className="font-semibold mb-4">{t('format.combos')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {EXAM_FORMAT.profileCombos.map((item) => (
            <Card key={item.combo} padding="p-4" hover>
              <p className="font-medium text-sm">{item.combo}</p>
              <p className="text-xs text-qapp-gray mt-1">{item.directions}</p>
            </Card>
          ))}
        </div>

        <Accordion items={structure} />
      </div>
    </section>
  )
}
