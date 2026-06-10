import { useState } from 'react'
import { Target, Sparkles, ChevronRight } from 'lucide-react'
import AnimatedNumber from './AnimatedNumber'
import Button from './Button'
import { calcReadiness, getGap, hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

export default function ScoreInputBar({
  currentScore,
  targetScore,
  onScoreChange,
  onTargetChange,
  onScrollTo,
  compact = false,
}) {
  const { t } = useLanguage()
  const [focused, setFocused] = useState(false)
  const scoreEntered = hasEnteredScore(currentScore)
  const gap = getGap(currentScore, targetScore)
  const readiness = calcReadiness(currentScore, targetScore)

  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
        <input
          type="number"
          min="0"
          max="140"
          value={currentScore ?? ''}
          placeholder="0"
          onChange={(e) => onScoreChange(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-14 text-lg font-bold text-qapp-blue bg-transparent focus:outline-none text-center"
        />
        <span className="text-qapp-gray text-sm">/ 140</span>
      </div>
    )
  }

  return (
    <section
      id="score-input"
      className={`relative overflow-hidden transition-all duration-500 ${
        scoreEntered
          ? 'bg-gradient-to-r from-qapp-blue-light/80 via-white to-qapp-blue-light/50 border-b border-qapp-blue/10'
          : 'bg-gradient-to-r from-qapp-blue via-blue-600 to-qapp-blue-dark border-b border-blue-700'
      }`}
    >
      {!scoreEntered && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>
      )}

      <div className="container-qapp relative py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <div className={`flex-1 ${scoreEntered ? 'text-qapp-dark' : 'text-white'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Target className={`w-5 h-5 ${scoreEntered ? 'text-qapp-blue' : 'text-white/90'}`} />
              <span className={`text-sm font-semibold uppercase tracking-wider ${scoreEntered ? 'text-qapp-blue' : 'text-white/90'}`}>
                {t('scoreInput.label')}
              </span>
              {!scoreEntered && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium animate-pulse-soft">
                  {t('scoreInput.required')}
                </span>
              )}
            </div>
            <p className={`text-lg sm:text-xl font-bold max-w-lg ${scoreEntered ? 'text-qapp-dark' : 'text-white'}`}>
              {scoreEntered ? t('scoreInput.entered') : t('scoreInput.prompt')}
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 ${scoreEntered ? '' : 'animate-fade-in'}`}>
            <div
              className={`relative flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-300 ${
                scoreEntered
                  ? 'bg-white border-2 border-qapp-blue/30 shadow-card'
                  : `bg-white shadow-2xl ${focused ? 'ring-4 ring-white/40 scale-[1.02]' : 'ring-2 ring-white/20'}`
              }`}
            >
              {!scoreEntered && (
                <span className="absolute -inset-1 rounded-2xl bg-white/30 animate-ping opacity-40 pointer-events-none" />
              )}
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-qapp-gray mb-1">
                  {t('common.current')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="140"
                  value={currentScore ?? ''}
                  placeholder="84"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={(e) => onScoreChange(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-24 sm:w-28 text-4xl sm:text-5xl font-extrabold text-qapp-blue bg-transparent focus:outline-none placeholder:text-blue-200 tabular-nums"
                />
              </div>
              <div className="text-3xl font-light text-gray-300">/</div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-qapp-gray mb-1">
                  {t('common.target')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="140"
                  value={targetScore}
                  onChange={(e) => onTargetChange(Number(e.target.value) || 0)}
                  className="w-20 sm:w-24 text-3xl sm:text-4xl font-bold text-qapp-dark bg-transparent focus:outline-none tabular-nums"
                />
              </div>
              <span className="text-sm font-medium text-qapp-gray self-end pb-2">140</span>
            </div>

            {scoreEntered && (
              <div className="flex gap-3 animate-fade-in">
                <div className="bg-white rounded-xl px-4 py-3 border border-gray-100 text-center min-w-[80px]">
                  <p className="text-[10px] text-qapp-gray uppercase font-medium">{t('common.gap')}</p>
                  <AnimatedNumber value={gap} className="text-2xl font-bold text-amber-600" />
                </div>
                <div className="bg-white rounded-xl px-4 py-3 border border-gray-100 text-center min-w-[80px]">
                  <p className="text-[10px] text-qapp-gray uppercase font-medium">{t('common.readiness')}</p>
                  <AnimatedNumber value={readiness} suffix="%" className="text-2xl font-bold text-green-600" />
                </div>
              </div>
            )}

            <Button
              onClick={() => onScrollTo(scoreEntered ? 'ai-insight' : 'planner')}
              className={`shrink-0 ${!scoreEntered ? 'bg-white text-qapp-blue hover:bg-blue-50' : ''}`}
              variant={scoreEntered ? 'primary' : 'secondary'}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {scoreEntered ? t('scoreInput.aiBtn') : t('hero.ctaPlan')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
