import { useEffect, useState } from 'react'

import { fetchDailyPrompt } from '~/api/dailyPrompts'
import { fetchPrompts } from '~/api/prompts'

import type { Prompt } from '~/api/prompts'
import type { Dispatch, SetStateAction } from 'react'

interface UseDailyPromptEditorResult {
  body: string
  setBody: Dispatch<SetStateAction<string>>
  prompts: Prompt[]
  isLoading: boolean
}

const useDailyPromptEditor = (dateKey: string): UseDailyPromptEditorResult => {
  /** Hooks */
  const [body, setBody] = useState('')
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)

  /** Effects */
  useEffect(() => {
    const load = async (): Promise<void> => {
      setIsLoading(true)
      const [dailyPrompt, availablePrompts] = await Promise.all([
        fetchDailyPrompt(dateKey),
        fetchPrompts(),
      ])
      setBody(dailyPrompt?.body ?? '')
      setPrompts(availablePrompts)
      setIsLoading(false)
    }
    void load()
  }, [dateKey])

  return { body, setBody, prompts, isLoading }
}

export default useDailyPromptEditor
