import { useEffect, useState } from 'react'

import { fetchDailyPrompts } from '~/api/dailyPrompts'

import type { IFetchDailyPromptsParams } from '~/api/dailyPrompts'
import type { Dispatch, SetStateAction } from 'react'

interface UseDailyPromptsResult {
  promptsByDate: Map<string, string>
  setPromptsByDate: Dispatch<SetStateAction<Map<string, string>>>
}

const useDailyPrompts = (
  options?: IFetchDailyPromptsParams,
): UseDailyPromptsResult => {
  /** Hooks */
  const [promptsByDate, setPromptsByDate] = useState<Map<string, string>>(
    new Map(),
  )

  /** Effects */
  useEffect(() => {
    const load = async (): Promise<void> => {
      const dailyPrompts = await fetchDailyPrompts({ ...options })
      setPromptsByDate(
        new Map(dailyPrompts.map(({ date, body }) => [date, body])),
      )
    }
    void load()
  }, [options])

  return { promptsByDate, setPromptsByDate }
}

export default useDailyPrompts
