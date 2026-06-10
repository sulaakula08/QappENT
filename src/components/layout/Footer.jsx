import Logo from '../ui/Logo'
import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="container-qapp">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="font-bold text-qapp-dark">QApp</span>
          </div>
          <p className="text-sm text-qapp-gray">{t('footer.copy')}</p>
        </div>
      </div>
    </footer>
  )
}
