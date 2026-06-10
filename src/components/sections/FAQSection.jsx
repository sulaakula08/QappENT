import { useState } from 'react'
import { Lightbulb, BarChart3, Sparkles, Loader2 } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Button from '../ui/Button'
import Card from '../ui/Card'
import FadeIn from '../ui/FadeIn'
import { useLanguage } from '../../context/LanguageContext'
import { fetchFAQAnswer } from '../../services/gemini'
import { hasEnteredScore } from '../../utils/helpers'

const CONCERN_IDS = ['time', 'subjects', 'grant', 'hours', 'stuck', 'realistic']

export default function FAQSection({ onScrollTo, currentScore, targetScore }) {
  const { t, lang } = useLanguage()
  const [selected, setSelected] = useState('time')
  const [aiAnswer, setAiAnswer] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState(null)

  const askAi = async () => {
    setAiLoading(true)
    setAiError(null)
    try {
      const answer = await fetchFAQAnswer({
        question: t(`concerns.${selected}.q`),
        lang,
        score: hasEnteredScore(currentScore) ? currentScore : null,
        target: targetScore,
      })
      setAiAnswer(answer)
    } catch (e) {
      setAiError(e.message)
      setAiAnswer('')
    } finally {
      setAiLoading(false)
    }
  }

  const handleSelect = (id) => {
    setSelected(id)
    setAiAnswer('')
    setAiError(null)
  }

  return (
    <section id="faq" className="py-14 sm:py-20 border-t border-gray-100">
      <div className="container-qapp">
        <FadeIn>
          <SectionHeader title={t('faq.title')} subtitle={t('faq.subtitle')} />
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6">
          <FadeIn delay={80} className="space-y-2">
            {CONCERN_IDS.map((id, i) => (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 border hover:translate-x-1 ${
                  selected === id
                    ? 'border-qapp-blue bg-qapp-blue-light font-medium shadow-card'
                    : 'border-gray-100 text-qapp-gray hover:border-gray-200'
                }`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {t(`concerns.${id}.q`)}
              </button>
            ))}
          </FadeIn>

          <FadeIn delay={160} className="lg:col-span-2">
            <Card className="transition-shadow duration-300 hover:shadow-card-hover">
              <h3 className="font-semibold text-lg mb-4">{t(`concerns.${selected}.q`)}</h3>
              <p className="text-sm text-qapp-gray leading-relaxed">{t(`concerns.${selected}.a`)}</p>

              {aiAnswer && (
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-qapp-blue-light to-white border border-qapp-blue/15 animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-qapp-blue" />
                    <span className="text-xs font-semibold text-qapp-blue uppercase tracking-wide">Gemini</span>
                  </div>
                  <p className="text-sm text-qapp-dark leading-relaxed">{aiAnswer}</p>
                </div>
              )}

              {aiError && <p className="text-xs text-amber-600 mt-3">{t('ai.error')}</p>}

              <div className="flex items-start gap-2 mt-5 p-4 bg-qapp-blue-light/50 rounded-xl">
                <Lightbulb className="w-4 h-4 text-qapp-blue mt-0.5 shrink-0" />
                <p className="text-sm text-qapp-gray">{t(`concerns.${selected}.tip`)}</p>
              </div>
              <div className="flex items-start gap-2 mt-3 p-4 border border-gray-100 rounded-xl">
                <BarChart3 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <p className="text-xs text-qapp-gray">{t(`concerns.${selected}.stat`)}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={askAi}
                  disabled={aiLoading}
                >
                  {aiLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  {t('ai.askAi')}
                </Button>
                <Button size="sm" onClick={() => {
                  const cta = t(`concerns.${selected}.cta`)
                  if (cta.includes('21') || cta.includes('күндік')) onScrollTo('plan-21')
                  else if (cta.includes('breakdown') || cta.includes('Breakdown')) onScrollTo('breakdown')
                  else if (cta.includes('план') || cta.includes('жоспар')) onScrollTo('planner')
                  else onScrollTo('universities')
                }}>
                  {t(`concerns.${selected}.cta`)}
                </Button>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
