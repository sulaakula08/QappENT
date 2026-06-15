import { Globe } from 'lucide-react'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import { useLanguage } from '../../context/LanguageContext'
import { useENTTab } from '../../context/ENTTabContext'
import { useScrollHeader } from '../../hooks/useScrollHeader'

const LANGS = [
  { id: 'ru', label: 'RU' },
  { id: 'kk', label: 'KZ' },
  { id: 'en', label: 'EN' },
]

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const { visible, scrolled } = useScrollHeader()
  const { setActiveTab } = useENTTab()

  const NAV_LINKS = [
    { label: t('nav.universities'), tab: 'universities' },
    { label: t('nav.colleges'), tab: null },
    { label: t('nav.about'), tab: null },
    { label: t('nav.blog'), tab: null },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          visible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          scrolled
            ? 'bg-white/70 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-gray-200/60'
            : 'bg-white/90 backdrop-blur-md border-gray-100'
        }`}
      >
        <div className="container-qapp">
          <div className="flex items-center justify-between h-16 sm:h-[68px]">
            <a href="#" className="shrink-0 flex items-center gap-2.5 group">
              <Logo size={36} />
              <span className="font-bold text-qapp-dark hidden sm:block group-hover:text-qapp-blue transition-colors duration-200">
                QApp
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => link.tab && setActiveTab(link.tab)}
                className="text-[15px] text-qapp-dark hover:text-qapp-blue transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-qapp-blue hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
            </nav>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`hidden md:block text-[15px] transition-colors duration-200 ${
                  lang === 'en' ? 'text-qapp-blue font-semibold' : 'text-qapp-dark hover:text-qapp-blue'
                }`}
              >
                {t('nav.foreign')}
              </button>

              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                {LANGS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLang(l.id)}
                    className={`px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
                      lang === l.id ? 'bg-qapp-blue text-white' : 'text-qapp-gray hover:bg-gray-50'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setLang('en')}
                className="text-qapp-gray hover:text-qapp-blue transition-colors duration-200 sm:hidden"
                aria-label="English"
              >
                <Globe className="w-5 h-5" />
              </button>

              <a href="#" className="text-[15px] text-qapp-dark hover:text-qapp-blue transition-colors duration-200 hidden sm:block">
                {t('nav.login')}
              </a>
              <Button size="sm">{t('nav.start')}</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16 sm:h-[68px] shrink-0" aria-hidden="true" />
    </>
  )
}
