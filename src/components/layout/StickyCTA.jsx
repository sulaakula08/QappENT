import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

const TAB_CTA = {
  score: { primary: 'tabs.ctaPractice', primaryTab: 'practice', secondary: 'tabs.ctaUniversities', secondaryTab: 'universities' },
  universities: { primary: 'tabs.ctaPractice', primaryTab: 'practice', secondary: 'tabs.ctaScore', secondaryTab: 'score' },
  practice: { primary: 'tabs.ctaScore', primaryTab: 'score', secondary: 'tabs.ctaLessons', secondaryTab: 'lessons' },
  lessons: { primary: 'tabs.ctaPractice', primaryTab: 'practice', secondary: 'tabs.ctaScore', secondaryTab: 'score' },
}

export default function StickyCTA({ activeTab, onTabChange, currentScore }) {
  const { t } = useLanguage()
  const scoreEntered = hasEnteredScore(currentScore)
  const cta = TAB_CTA[activeTab] || TAB_CTA.score

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] animate-slide-up">
      <div className="container-qapp py-3 flex items-center justify-between gap-4">
        <p className="hidden sm:block text-sm text-qapp-gray max-w-md truncate">
          {scoreEntered ? t('tabs.stickyHint') : t('common.enterScoreHint')}
        </p>
        <div className="flex gap-2 ml-auto shrink-0">
          <Button variant="secondary" size="sm" onClick={() => onTabChange(cta.secondaryTab)}>
            {t(cta.secondary)}
          </Button>
          <Button size="sm" onClick={() => onTabChange(cta.primaryTab)}>
            {t(cta.primary)}
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
