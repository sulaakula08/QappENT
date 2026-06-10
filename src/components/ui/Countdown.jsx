import { useState, useEffect } from 'react'
import { getDaysUntil } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'
import AnimatedNumber from './AnimatedNumber'

export default function Countdown({ targetDate, compact = false }) {
  const { t } = useLanguage()
  const [time, setTime] = useState(getDaysUntil(targetDate))

  useEffect(() => {
    const interval = setInterval(() => setTime(getDaysUntil(targetDate)), 60000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (compact) {
    return (
      <span className="font-semibold text-qapp-blue">
        <AnimatedNumber value={time.days} className="font-semibold text-qapp-blue" />
        {t('common.days').charAt(0)}{' '}
        <AnimatedNumber value={time.hours} className="font-semibold text-qapp-blue" />
        {t('common.hours').charAt(0)}
      </span>
    )
  }

  return (
    <div className="flex gap-3 sm:gap-5">
      {[
        { value: time.days, label: t('common.days') },
        { value: time.hours, label: t('common.hours') },
        { value: time.minutes, label: t('common.mins') },
      ].map((unit) => (
        <div key={unit.label} className="text-center flex-1">
          <div className="bg-qapp-blue-light rounded-2xl px-3 sm:px-5 py-3 sm:py-4 min-w-[64px] transition-transform hover:scale-105">
            <AnimatedNumber
              value={unit.value}
              className="text-2xl sm:text-3xl font-bold text-qapp-blue block"
            />
          </div>
          <span className="text-xs sm:text-sm text-qapp-gray mt-2 block font-medium">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}
