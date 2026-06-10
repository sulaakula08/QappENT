import { useState, useEffect, useRef } from 'react'
import { buildENTContext, fetchENTInsight } from '../services/gemini'
import { hasEnteredScore } from '../utils/helpers'

export function useGeminiInsight({
  currentScore,
  targetScore,
  selectedUniversity,
  selectedProgram,
  selectedProfession,
  subjects,
  lang,
}) {
  const [insight, setInsight] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const timerRef = useRef(null)
  const lastKeyRef = useRef('')
  const abortRef = useRef(false)

  useEffect(() => {
    abortRef.current = false

    if (!hasEnteredScore(currentScore)) {
      setInsight(null)
      setError(null)
      setLoading(false)
      lastKeyRef.current = ''
      return
    }

    const key = `${currentScore}-${targetScore}-${selectedUniversity}-${selectedProgram}-${lang}`
    if (key === lastKeyRef.current) return

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      setLoading(true)
      setError(null)

      try {
        const context = buildENTContext({
          currentScore,
          targetScore,
          universityId: selectedUniversity,
          programId: selectedProgram,
          professionId: selectedProfession,
          subjects,
          lang,
        })
        const result = await fetchENTInsight(context)
        if (abortRef.current) return
        lastKeyRef.current = key
        setInsight(result)
      } catch (e) {
        if (abortRef.current) return
        setError(e.message || 'AI error')
      } finally {
        if (!abortRef.current) setLoading(false)
      }
    }, 900)

    return () => {
      abortRef.current = true
      clearTimeout(timerRef.current)
    }
  }, [currentScore, targetScore, selectedUniversity, selectedProgram, selectedProfession, subjects, lang])

  const refresh = () => {
    lastKeyRef.current = ''
    if (!hasEnteredScore(currentScore)) return

    setLoading(true)
    setError(null)

    const context = buildENTContext({
      currentScore,
      targetScore,
      universityId: selectedUniversity,
      programId: selectedProgram,
      professionId: selectedProfession,
      subjects,
      lang,
    })

    fetchENTInsight(context)
      .then((result) => {
        lastKeyRef.current = `${currentScore}-${targetScore}-${selectedUniversity}-${selectedProgram}-${lang}`
        setInsight(result)
      })
      .catch((e) => setError(e.message || 'AI error'))
      .finally(() => setLoading(false))
  }

  return { insight, loading, error, refresh }
}
