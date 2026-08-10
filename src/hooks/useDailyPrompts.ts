import { useEffect, useState } from 'react'

import { fetchDailyPrompts } from '~/api/dailyPrompts'

import type { Dispatch, SetStateAction } from 'react'

interface UseDailyPromptsResult {
  promptsByDate: Map<string, string>
  setPromptsByDate: Dispatch<SetStateAction<Map<string, string>>>
}

const useDailyPrompts = (): UseDailyPromptsResult => {
  /** Hooks */
  const [promptsByDate, setPromptsByDate] = useState<Map<string, string>>(
    new Map(),
  )

  /** Effects */
  useEffect(() => {
    const load = async (): Promise<void> => {
      const dailyPrompts = await fetchDailyPrompts()
      setPromptsByDate(
        new Map(dailyPrompts.map(({ date, body }) => [date, body])),
      )
    }
    void load()
  }, [])

  return { promptsByDate, setPromptsByDate }
}

export default useDailyPrompts
