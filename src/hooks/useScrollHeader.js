import { useState, useEffect, useRef } from 'react'

const TOP_THRESHOLD = 72
const SCROLL_DELTA = 8

export function useScrollHeader() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    lastY.current = window.scrollY

    const update = () => {
      const y = window.scrollY
      setScrolled(y > 16)

      if (y <= TOP_THRESHOLD) {
        setVisible(true)
      } else if (y - lastY.current > SCROLL_DELTA) {
        setVisible(false)
      } else if (lastY.current - y > SCROLL_DELTA) {
        setVisible(true)
      }

      lastY.current = y
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { visible, scrolled }
}
