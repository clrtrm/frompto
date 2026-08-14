import { useEffect, useState } from 'react'

import { fetchReveal } from '~/api/reveals'

import type { RevealResult } from '~/api/reveals'

interface UseRevealResult {
  result: RevealResult | null
  isLoading: boolean
}

const useReveal = (date: string): UseRevealResult => {
  /** Hooks */
  const [result, setResult] = useState<RevealResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  /** Effects */
  useEffect(() => {
    const load = async (): Promise<void> => {
      setIsLoading(true)
      const revealResult = await fetchReveal({ date })
      setResult(revealResult)
      setIsLoading(false)
    }
    void load()
  }, [date])

  return { result, isLoading }
}

export default useReveal
