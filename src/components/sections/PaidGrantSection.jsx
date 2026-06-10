import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { UNIVERSITIES } from '../../data/mockData'
import { getQualifyStatus, getGap, hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

export default function PaidGrantSection({ currentScore }) {
  const { t } = useLanguage()
  const scoreEntered = hasEnteredScore(currentScore)

  const rows = UNIVERSITIES.flatMap((uni) =>
    uni.programs.map((prog) => {
      const status = getQualifyStatus(currentScore, prog.minPaidScore, prog.avgGrantScore, t)
      const grantGap = getGap(currentScore, prog.avgGrantScore)
      const paidGap = getGap(currentScore, prog.minPaidScore)
      let statusLabel = status.label
      if (scoreEntered) {
        if (status.status === 'paid') statusLabel = t('paidGrant.paidOkGrantGap', { gap: grantGap })
        if (status.status === 'gap') statusLabel = t('paidGrant.paidGapGrantGap', { paid: paidGap, grant: grantGap })
      }
      return {
        university: uni.name,
        program: prog.name,
        paidAvg: prog.avgPaidScore,
        grantAvg: prog.avgGrantScore,
        diff: prog.avgGrantScore - prog.avgPaidScore,
        userScore: scoreEntered ? currentScore : '—',
        statusLabel,
        variant: !scoreEntered ? 'default' : status.color === 'green' ? 'green' : status.color === 'blue' ? 'blue' : 'amber',
      }
    })
  )

  return (
    <section id="paid-grant" className="py-14 sm:py-20 border-t border-gray-100">
      <div className="container-qapp">
        <SectionHeader title={t('paidGrant.title')} subtitle={t('paidGrant.subtitle')} />

        <Card padding="p-0" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray">{t('paidGrant.university')}</th>
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray">{t('paidGrant.program')}</th>
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray">{t('paidGrant.paidAvg')}</th>
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray">{t('paidGrant.grantAvg')}</th>
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray">{t('paidGrant.diff')}</th>
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray">{t('paidGrant.yourScore')}</th>
                  <th className="text-left px-5 py-3 font-medium text-qapp-gray">{t('paidGrant.status')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3.5 font-medium">{row.university}</td>
                    <td className="px-5 py-3.5">{row.program}</td>
                    <td className="px-5 py-3.5 text-qapp-gray">{row.paidAvg}</td>
                    <td className="px-5 py-3.5 text-qapp-gray">{row.grantAvg}</td>
                    <td className="px-5 py-3.5 text-qapp-gray">+{row.diff}</td>
                    <td className="px-5 py-3.5 font-semibold">{row.userScore}</td>
                    <td className="px-5 py-3.5"><Badge variant={row.variant}>{row.statusLabel}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  )
}
