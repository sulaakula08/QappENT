import { Target } from 'lucide-react'
import Card from '../ui/Card'
import Countdown from '../ui/Countdown'
import ProgressBar from '../ui/ProgressBar'
import AnimatedNumber from '../ui/AnimatedNumber'
import FadeIn from '../ui/FadeIn'
import { ENT_DATE } from '../../data/mockData'
import { calcReadiness, getGap, hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

export default function ScoreDashboard({
  currentScore,
  targetScore,
  onScoreChange,
  onTargetChange,
}) {
  const { t } = useLanguage()
  const scoreEntered = hasEnteredScore(currentScore)
  const gap = getGap(currentScore, targetScore)
  const readiness = calcReadiness(currentScore, targetScore)

  return (
    <FadeIn>
      <div className="mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-qapp-dark tracking-tight">
          {t('tabs.scoreHeading')}
        </h1>
        <p className="text-sm text-qapp-gray mt-1 max-w-xl">{t('tabs.scoreIntro')}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-5 mt-6">
        <Card className="lg:col-span-3 border-qapp-blue/15 shadow-card" padding="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-qapp-blue" />
            <span className="text-sm font-semibold uppercase tracking-wider text-qapp-blue">
              {t('scoreInput.label')}
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-xs font-medium text-qapp-gray mb-2 uppercase tracking-wide">
                {t('common.current')}
              </label>
              <input
                type="number"
                min="0"
                max="140"
                value={currentScore ?? ''}
                placeholder="84"
                onChange={(e) => onScoreChange(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full text-4xl sm:text-5xl font-extrabold text-qapp-blue bg-transparent focus:outline-none placeholder:text-blue-200 tabular-nums"
              />
              <span className="text-sm text-qapp-gray">/ 140</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-qapp-gray mb-2 uppercase tracking-wide">
                {t('common.target')}
              </label>
              <input
                type="number"
                min="0"
                max="140"
                value={targetScore}
                onChange={(e) => onTargetChange(Number(e.target.value) || 0)}
                className="w-full text-4xl sm:text-5xl font-bold text-qapp-dark bg-transparent focus:outline-none tabular-nums"
              />
              <span className="text-sm text-qapp-gray">/ 140</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-qapp-gray mb-2 uppercase tracking-wide">
                {t('common.gap')}
              </label>
              {scoreEntered ? (
                <>
                  <AnimatedNumber
                    value={gap}
                    className="text-4xl sm:text-5xl font-bold text-amber-600 block tabular-nums"
                  />
                  <span className="text-sm text-qapp-gray">{t('common.pts')}</span>
                </>
              ) : (
                <>
                  <span className="text-4xl sm:text-5xl font-bold text-gray-300 block">—</span>
                  <span className="text-sm text-qapp-gray">{t('common.pts')}</span>
                </>
              )}
            </div>
          </div>

          {!scoreEntered && (
            <p className="text-sm text-qapp-gray mb-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
              {t('common.enterScoreHint')}
            </p>
          )}

          <div className="flex justify-between text-sm mb-2">
            <span className="text-qapp-gray font-medium">{t('common.readiness')}</span>
            {scoreEntered ? (
              <AnimatedNumber value={readiness} suffix="%" className="font-bold text-qapp-blue" />
            ) : (
              <span className="text-qapp-gray">—</span>
            )}
          </div>
          <ProgressBar value={readiness} max={100} color="blue" size="lg" />
        </Card>

        <Card className="lg:col-span-2 shadow-card" padding="p-6">
          <p className="text-sm font-semibold text-qapp-dark mb-4">{t('hero.countdown')}</p>
          <Countdown targetDate={ENT_DATE} />
          <p className="text-xs text-qapp-gray mt-4 leading-relaxed">{t('tabs.countdownHint')}</p>
        </Card>
      </div>
    </FadeIn>
  )
}
