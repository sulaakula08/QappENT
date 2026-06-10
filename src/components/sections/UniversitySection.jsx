import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Select from '../ui/Select'
import { UNIVERSITIES } from '../../data/mockData'
import { getQualifyStatus, getDetailedStatus, hasEnteredScore } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

export default function UniversitySection({
  currentScore, selectedUniversity, selectedProgram, onUniversityChange, onProgramChange,
}) {
  const { t } = useLanguage()
  const uni = UNIVERSITIES.find((u) => u.id === selectedUniversity) || UNIVERSITIES[0]
  const program = uni.programs.find((p) => p.id === selectedProgram) || uni.programs[0]
  const qualify = getQualifyStatus(currentScore, program.minPaidScore, program.avgGrantScore, t)
  const detail = getDetailedStatus(currentScore, program, t)
  const scoreEntered = hasEnteredScore(currentScore)

  return (
    <section id="universities" className="py-14 sm:py-20 border-t border-gray-100">
      <div className="container-qapp">
        <SectionHeader title={t('universities.title')} subtitle={t('universities.subtitle')} />

        <div className="grid sm:grid-cols-2 gap-4 mb-6 max-w-2xl">
          <Select
            label={t('universities.uni')}
            value={selectedUniversity}
            onChange={(v) => { onUniversityChange(v); const u = UNIVERSITIES.find((x) => x.id === v); if (u) onProgramChange(u.programs[0].id) }}
            options={UNIVERSITIES.map((u) => ({ value: u.id, label: `${u.name} · ${u.city}` }))}
            placeholder=""
          />
          <Select
            label={t('universities.program')}
            value={selectedProgram}
            onChange={onProgramChange}
            options={uni.programs.map((p) => ({ value: p.id, label: p.name }))}
            placeholder=""
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-xl font-bold">{uni.name}</h3>
                <p className="text-sm text-qapp-gray">{program.name} · {uni.city}</p>
              </div>
              <Badge variant={qualify.color === 'green' ? 'green' : qualify.color === 'blue' ? 'blue' : qualify.color === 'amber' ? 'amber' : 'default'}>
                {qualify.label}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: t('universities.minPaid'), value: program.minPaidScore },
                { label: t('universities.avgPaid'), value: program.avgPaidScore },
                { label: t('universities.avgGrant'), value: program.avgGrantScore },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 border border-gray-100 rounded-xl">
                  <p className="text-xs text-qapp-gray">{s.label}</p>
                  <p className="text-lg font-bold mt-1">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-qapp-gray">{t('universities.yourScore')}</span>
                <span className="font-semibold">{scoreEntered ? currentScore : '—'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-qapp-gray">{t('universities.profileSubjects')}</span>
                <span className="font-medium">{program.profileSubjects.join(' + ')}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-qapp-gray">{t('universities.deadline')}</span>
                <span className="font-medium">{uni.deadline}</span>
              </div>
            </div>

            <div className="mt-5 p-4 bg-qapp-blue-light/60 rounded-xl">
              <p className="text-sm leading-relaxed">{detail}</p>
            </div>
          </Card>

          <Card padding="p-0" className="overflow-hidden">
            {uni.programs.map((prog, i) => {
              const q = getQualifyStatus(currentScore, prog.minPaidScore, prog.avgGrantScore, t)
              return (
                <div
                  key={prog.id}
                  className={`flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 ${i < uni.programs.length - 1 ? 'border-b border-gray-100' : ''} ${selectedProgram === prog.id ? 'bg-qapp-blue-light/30' : ''}`}
                  onClick={() => onProgramChange(prog.id)}
                >
                  <div>
                    <p className="font-medium text-sm">{prog.name}</p>
                    <p className="text-xs text-qapp-gray">{prog.profileSubjects.join(' + ')}</p>
                  </div>
                  <Badge variant={q.color === 'green' ? 'green' : q.color === 'blue' ? 'blue' : q.color === 'amber' ? 'amber' : 'default'}>
                    {q.label}
                  </Badge>
                </div>
              )
            })}
          </Card>
        </div>
      </div>
    </section>
  )
}
