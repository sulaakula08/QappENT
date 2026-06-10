import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Countdown from '../ui/Countdown'
import ProgressBar from '../ui/ProgressBar'
import Highlight from '../ui/Highlight'
import AnimatedNumber from '../ui/AnimatedNumber'
import FadeIn from '../ui/FadeIn'
import { ENT_DATE } from '../../data/mockData'
import { calcReadiness, getGap, hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

export default function HeroSection({ currentScore, targetScore, onScoreChange, onTargetChange, onScrollTo }) {
  const { t } = useLanguage()
  const gap = getGap(currentScore, targetScore)
  const readiness = calcReadiness(currentScore, targetScore)
  const scoreEntered = hasEnteredScore(currentScore)

  const subtitle = t('hero.subtitle')
  const highlight = t('hero.subtitleHighlight')
  const subtitleParts = subtitle.split(highlight)

  return (
    <section id="hero" className="pt-10 sm:pt-14 pb-8 hero-glow">
      <div className="container-qapp">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <FadeIn>
            <p className="text-sm font-semibold text-qapp-blue mb-4 inline-flex items-center gap-2 animate-pulse-soft">
              <span className="w-2 h-2 rounded-full bg-qapp-blue" />
              {t('hero.badge')}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold text-qapp-dark leading-[1.08] tracking-tight">
              {t('hero.titleBefore')}{' '}
              <Highlight className="text-3xl sm:text-4xl lg:text-[3rem] xl:text-[3.25rem]">{t('hero.titleHighlight')}</Highlight>
              <br />
              <span className="text-gradient-blue">{t('hero.titleAfter')}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-qapp-gray leading-relaxed max-w-xl">
              {subtitleParts[0]}
              {subtitleParts.length > 1 && <Highlight variant="amber">{highlight}</Highlight>}
              {subtitleParts[1]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => onScrollTo('planner')} className="hover:scale-[1.02] active:scale-[0.98]">
                {t('hero.ctaPlan')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="secondary" onClick={() => onScrollTo('universities')} className="hover:scale-[1.02]">
                {t('hero.ctaUni')}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={150} className="space-y-4">
            <Card padding="p-6" className="shadow-card">
              <p className="text-base font-medium text-qapp-dark mb-4">{t('hero.countdown')}</p>
              <Countdown targetDate={ENT_DATE} />
            </Card>

            <Card padding="p-6" className="shadow-card border-qapp-blue/10">
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                  <p className="text-xs font-medium text-qapp-gray mb-1.5 uppercase tracking-wide">{t('common.current')}</p>
                  <input
                    type="number"
                    min="0"
                    max="140"
                    value={currentScore ?? ''}
                    placeholder={t('common.scorePlaceholder')}
                    onChange={(e) => onScoreChange(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full text-2xl sm:text-3xl font-bold text-qapp-dark bg-transparent focus:outline-none placeholder:text-gray-300 placeholder:font-normal placeholder:text-lg"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-qapp-gray mb-1.5 uppercase tracking-wide">{t('common.target')}</p>
                  <input
                    type="number"
                    min="0"
                    max="140"
                    value={targetScore}
                    onChange={(e) => onTargetChange(Number(e.target.value) || 0)}
                    className="w-full text-2xl sm:text-3xl font-bold text-qapp-blue bg-transparent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-qapp-gray mb-1.5 uppercase tracking-wide">{t('common.gap')}</p>
                  <AnimatedNumber
                    value={scoreEntered ? gap : null}
                    className="text-2xl sm:text-3xl font-bold text-amber-600"
                  />
                </div>
              </div>
              {!scoreEntered && (
                <p className="text-sm text-qapp-gray mb-4">{t('common.enterScoreHint')}</p>
              )}
              <div className="flex justify-between text-sm mb-2">
                <span className="text-qapp-gray font-medium">{t('common.readiness')}</span>
                {scoreEntered ? (
                  <AnimatedNumber value={readiness} suffix="%" className="font-bold text-qapp-blue text-lg" />
                ) : (
                  <span className="text-qapp-gray">—</span>
                )}
              </div>
              <ProgressBar value={readiness} max={100} color="blue" size="lg" />
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
