import Card from '../ui/Card'
import SectionHeader from '../ui/SectionHeader'
import StatusTimeline from '../ui/StatusTimeline'
import FadeIn from '../ui/FadeIn'
import { useLanguage } from '../../context/LanguageContext'

export default function PrepTimelineSection() {
  const { t } = useLanguage()

  const PREP_TIMELINE = [
    { label: t('timeline.diag'), date: '10 мая', state: 'done' },
    { label: t('timeline.plan'), date: '18 мая', state: 'done' },
    { label: t('timeline.mock'), date: '5 июн', state: 'current' },
    { label: t('timeline.ent'), date: t('timeline.entPending'), state: 'pending' },
  ]

  return (
    <section id="prep-timeline">
      <FadeIn>
        <SectionHeader
          title={t('steps.s3title')}
          subtitle={t('steps.s3desc')}
        />
        <Card padding="p-5 sm:p-6">
          <StatusTimeline items={PREP_TIMELINE} />
        </Card>
      </FadeIn>
    </section>
  )
}
