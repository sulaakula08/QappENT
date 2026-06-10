import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import AnimatedNumber from '../ui/AnimatedNumber'
import { getGap, hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

export default function StickyCTA({ currentScore, targetScore, onScrollTo }) {
  const { t } = useLanguage()
  const gap = getGap(currentScore, targetScore)
  const scoreEntered = hasEnteredScore(currentScore)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] animate-slide-up">
      <div className="container-qapp py-3 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-qapp-dark">
            {scoreEntered ? (
              <>
                <AnimatedNumber value={currentScore} className="font-semibold" />
                {' → '}
                <AnimatedNumber value={targetScore} className="font-semibold text-qapp-blue" />
              </>
            ) : (
              t('common.scorePlaceholder')
            )}
          </p>
          <p className="text-xs text-qapp-gray">
            {t('sticky.gap')}: {scoreEntered ? <AnimatedNumber value={gap} className="font-semibold text-amber-600" /> : '—'}
          </p>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant="secondary" size="sm" onClick={() => onScrollTo('universities')}>{t('sticky.requirements')}</Button>
          <Button size="sm" onClick={() => onScrollTo('planner')}>
            {t('sticky.startPlan')}
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
