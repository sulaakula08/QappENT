import { CheckCircle, XCircle } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import FadeIn from '../ui/FadeIn'
import AnimatedNumber from '../ui/AnimatedNumber'
import Badge from '../ui/Badge'
import { PROFESSIONS, UNIVERSITIES } from '../../data/mockData'
import { getMatchingSummary, getQualifyStatus, hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

export default function MatchingSection({ selectedProfession, currentScore }) {
  const { t } = useLanguage()
  const summary = getMatchingSummary(selectedProfession, currentScore, t)
  const scoreEntered = hasEnteredScore(currentScore)
  const profession = PROFESSIONS.find((p) => p.id === selectedProfession) || PROFESSIONS[0]

  const matches = profession.universities.map((uid) => {
    const uni = UNIVERSITIES.find((u) => u.id === uid)
    const prog = uni?.programs[0]
    if (!prog) return null
    const status = getQualifyStatus(currentScore, prog.minPaidScore, prog.avgGrantScore, t)
    return { uni, prog, status, grantGap: prog.avgGrantScore - (Number(currentScore) || 0) }
  }).filter(Boolean)

  return (
    <section id="matching" className="py-14 sm:py-20 border-t border-gray-100">
      <div className="container-qapp">
        <FadeIn>
          <SectionHeader title={t('matching.title')} subtitle={t('matching.subtitle')} />
        </FadeIn>

        <FadeIn delay={80}>
          <Card className="mb-8 bg-qapp-blue-light/40 border-qapp-blue/10" padding="p-5">
            <p className="text-sm text-qapp-dark leading-relaxed">{summary.text}</p>
          </Card>
        </FadeIn>

        {scoreEntered && (
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <FadeIn delay={120}>
              <Card padding="p-5" className="text-center hover-lift">
                <AnimatedNumber value={summary.grantCount} className="text-3xl font-bold text-green-600" />
                <p className="text-sm text-qapp-gray mt-1">{t('matching.grantQualify')}</p>
              </Card>
            </FadeIn>
            <FadeIn delay={180}>
              <Card padding="p-5" className="text-center hover-lift">
                <AnimatedNumber value={summary.paidCount - summary.grantCount} className="text-3xl font-bold text-blue-600" />
                <p className="text-sm text-qapp-gray mt-1">{t('matching.paidOnly')}</p>
              </Card>
            </FadeIn>
            <FadeIn delay={240}>
              <Card padding="p-5" className="text-center hover-lift">
                <AnimatedNumber value={summary.total - summary.paidCount} className="text-3xl font-bold text-amber-600" />
                <p className="text-sm text-qapp-gray mt-1">{t('matching.dontQualify')}</p>
              </Card>
            </FadeIn>
          </div>
        )}

        <div className="space-y-3">
          {matches.map(({ uni, prog, status, grantGap }, i) => (
            <FadeIn key={uni.id} delay={i * 60}>
            <Card padding="p-5" className="hover-lift">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {!scoreEntered || status.status === 'gap' ? (
                    <XCircle className="w-5 h-5 text-amber-500" />
                  ) : (
                    <CheckCircle className={`w-5 h-5 ${status.status === 'grant' ? 'text-green-500' : 'text-blue-500'}`} />
                  )}
                  <div>
                    <p className="font-semibold">{uni.name} · {profession.nameRu}</p>
                    <p className="text-sm text-qapp-gray">
                      Paid {prog.avgPaidScore} · Grant {prog.avgGrantScore} · {scoreEntered ? `You ${currentScore}` : '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {scoreEntered && grantGap > 0 && status.status !== 'grant' && (
                    <span className="text-sm text-amber-600">{t('matching.grantGap', { gap: grantGap })}</span>
                  )}
                  <Badge variant={!scoreEntered ? 'default' : status.color === 'green' ? 'green' : status.color === 'blue' ? 'blue' : 'amber'}>
                    {!scoreEntered ? '—' : status.status === 'grant' ? t('matching.youQualify') : status.status === 'paid' ? t('matching.paidOk') : t('matching.youDont')}
                  </Badge>
                </div>
              </div>
            </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
