import { useEffect, useState } from 'react'

import { fetchDailyPrompts } from '~/api/dailyPrompts'

import type { IFetchDailyPromptsParams } from '~/api/dailyPrompts'
import type { TDailyPrompt } from '~/types/dailyPrompt'
import type { Dispatch, SetStateAction } from 'react'

interface IResult {
  dailyPrompts: TDailyPrompt[]
  setDailyPrompts: Dispatch<SetStateAction<TDailyPrompt[]>>
}

const useDailyPrompts = (options?: IFetchDailyPromptsParams): IResult => {
  /** Hooks */
  const [dailyPrompts, setDailyPrompts] = useState<TDailyPrompt[]>([])

  /** Effects */
  useEffect(() => {
    const load = async (): Promise<void> => {
      const response = await fetchDailyPrompts({ ...options })
      setDailyPrompts(response)
    }
    void load()
  }, [options])

  return { dailyPrompts, setDailyPrompts }
}

export default useDailyPrompts
