import { Target, GraduationCap, ClipboardList, PlayCircle } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const TABS = [
  { id: 'score', icon: Target, labelKey: 'tabs.score', descKey: 'tabs.scoreDesc' },
  { id: 'universities', icon: GraduationCap, labelKey: 'tabs.universities', descKey: 'tabs.universitiesDesc' },
  { id: 'practice', icon: ClipboardList, labelKey: 'tabs.practice', descKey: 'tabs.practiceDesc' },
  { id: 'lessons', icon: PlayCircle, labelKey: 'tabs.lessons', descKey: 'tabs.lessonsDesc' },
]

export default function ENTTabNav({ activeTab, onTabChange }) {
  const { t } = useLanguage()

  return (
    <>
      {/* Mobile: horizontal tabs */}
      <div className="lg:hidden -mx-1 overflow-x-auto pb-1">
        <div className="flex gap-2 min-w-max px-1">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  active
                    ? 'bg-qapp-blue text-white shadow-md'
                    : 'bg-gray-50 text-qapp-gray hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {t(tab.labelKey)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Desktop: left sidebar */}
      <nav className="hidden lg:block w-56 xl:w-60 shrink-0">
        <div className="sticky top-[84px] space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-qapp-gray px-3 mb-3">
            {t('tabs.menu')}
          </p>
          {TABS.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-200 group ${
                  active
                    ? 'bg-qapp-blue text-white shadow-card'
                    : 'text-qapp-dark hover:bg-qapp-blue-light/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-white' : 'text-qapp-blue'}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight">{t(tab.labelKey)}</p>
                    <p className={`text-xs mt-0.5 leading-snug ${active ? 'text-white/80' : 'text-qapp-gray'}`}>
                      {t(tab.descKey)}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
