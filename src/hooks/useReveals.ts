// src/hooks/useReveals.ts
import { useEffect, useState } from 'react'

import { fetchReveals } from '~/api/reveals'

import type { IRevealSummary } from '~/types/reveal'
import type { Dispatch, SetStateAction } from 'react'

interface IResult {
  reveals: IRevealSummary[]
  setReveals: Dispatch<SetStateAction<IRevealSummary[]>>
}

const useReveals = (): IResult => {
  /** Hooks */
  const [reveals, setReveals] = useState<IRevealSummary[]>([])

  /** Effects */
  useEffect(() => {
    const load = async (): Promise<void> => {
      const response = await fetchReveals()
      setReveals(response)
    }
    void load()
  }, [])

  return { reveals, setReveals }
}

export default useReveals
