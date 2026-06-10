import { useEffect, useState, useRef } from 'react'

export default function AnimatedNumber({
  value,
  className = '',
  suffix = '',
  placeholder = '—',
  duration = 650,
}) {
  const [display, setDisplay] = useState(0)
  const prevRef = useRef(0)
  const isEmpty = value === null || value === undefined || value === '' || value === '—'

  useEffect(() => {
    if (isEmpty) return

    const end = Number(value)
    if (Number.isNaN(end)) return

    const start = typeof prevRef.current === 'number' ? prevRef.current : 0
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + (end - start) * eased))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        prevRef.current = end
      }
    }

    requestAnimationFrame(tick)
  }, [value, isEmpty, duration])

  if (isEmpty) {
    return <span className={`${className} text-qapp-gray`}>{placeholder}</span>
  }

  return (
    <span className={`${className} tabular-nums inline-block animate-number-pop`}>
      {display}{suffix}
    </span>
  )
}
