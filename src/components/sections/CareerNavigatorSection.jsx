import { Briefcase, TrendingUp } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Select from '../ui/Select'
import { PROFESSIONS, UNIVERSITIES } from '../../data/mockData'
import { hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

const COMP_VARIANT = { 'Very High': 'red', High: 'amber', Medium: 'green', Low: 'blue' }

export default function CareerNavigatorSection({ selectedProfession, onProfessionChange, currentScore }) {
  const { t } = useLanguage()
  const profession = PROFESSIONS.find((p) => p.id === selectedProfession) || PROFESSIONS[0]
  const scoreEntered = hasEnteredScore(currentScore)
  const matchedUnis = profession.universities.map((id) => UNIVERSITIES.find((u) => u.id === id)).filter(Boolean)
  const chanceLevel = !scoreEntered ? '—' : currentScore >= profession.recommendedScore ? t('common.high') : currentScore >= profession.recommendedScore - 20 ? t('common.medium') : t('common.low')

  return (
    <section id="career" className="py-14 sm:py-20 border-t border-gray-100">
      <div className="container-qapp">
        <SectionHeader title={t('career.title')} subtitle={t('career.subtitle')} />

        <div className="max-w-md mb-8">
          <Select
            label={t('career.profession')}
            value={selectedProfession}
            onChange={onProfessionChange}
            options={PROFESSIONS.map((p) => ({ value: p.id, label: p.nameRu }))}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-qapp-blue-light flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-qapp-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{profession.nameRu}</h3>
                <p className="text-sm text-qapp-gray">{profession.name}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-qapp-gray mb-2">{t('career.requiredSubjects')}</p>
                <div className="flex flex-wrap gap-2">
                  {profession.subjects.map((s) => <Badge key={s} variant="blue">{s}</Badge>)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-100 rounded-xl">
                  <p className="text-xs text-qapp-gray">{t('career.recommendedScore')}</p>
                  <p className="text-2xl font-bold">{profession.recommendedScore}+</p>
                </div>
                <div className="p-4 border border-gray-100 rounded-xl">
                  <p className="text-xs text-qapp-gray">{t('career.yourScore')}</p>
                  <p className={`text-2xl font-bold ${scoreEntered && currentScore >= profession.recommendedScore ? 'text-green-600' : scoreEntered ? 'text-amber-600' : 'text-qapp-gray'}`}>
                    {scoreEntered ? currentScore : '—'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-qapp-gray" />
                  <span className="text-sm text-qapp-gray">{t('career.grantComp')}:</span>
                  <Badge variant={COMP_VARIANT[profession.grantCompetitiveness]}>{profession.grantCompetitiveness}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-qapp-gray">{t('career.paidComp')}:</span>
                  <Badge variant={COMP_VARIANT[profession.paidCompetitiveness]}>{profession.paidCompetitiveness}</Badge>
                </div>
                {scoreEntered && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-qapp-gray">{t('career.yourChance')}:</span>
                    <Badge variant={chanceLevel === t('common.high') ? 'green' : chanceLevel === t('common.medium') ? 'amber' : 'red'}>{chanceLevel}</Badge>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4">{t('career.topUnis')}</h3>
            <div className="space-y-2">
              {matchedUnis.map((uni) => {
                const prog = uni.programs[0]
                const grantOk = scoreEntered && currentScore >= prog.avgGrantScore
                const paidOk = scoreEntered && currentScore >= prog.minPaidScore
                return (
                  <div key={uni.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div>
                      <p className="font-medium text-sm">{uni.name}</p>
                      <p className="text-xs text-qapp-gray">{prog.name} · {uni.city}</p>
                    </div>
                    <Badge variant={!scoreEntered ? 'default' : grantOk ? 'green' : paidOk ? 'blue' : 'amber'}>
                      {!scoreEntered ? '—' : grantOk ? t('status.grant') : paidOk ? t('status.paid') : t('status.gap')}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
