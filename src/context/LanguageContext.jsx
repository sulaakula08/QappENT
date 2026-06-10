import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { translations, interpolate } from '../i18n/translations'

const LanguageContext = createContext(null)

const LANG_ATTR = { ru: 'ru', kk: 'kk', en: 'en' }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ru')

  useEffect(() => {
    document.documentElement.lang = LANG_ATTR[lang] || 'ru'
  }, [lang])

  const t = useCallback((key, params) => {
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      value = value?.[k]
    }
    if (typeof value !== 'string') return key
    return params ? interpolate(value, params) : value
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
