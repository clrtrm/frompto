import { apiFetch } from '~/api/client'

import type { IDailyPrompt } from '~/types/dailyPrompt'

interface UpsertDailyPromptResult {
  status: 'updated' | 'deleted' | 'invalid'
  dailyPrompt?: IDailyPrompt
  errors?: string[]
}

export interface IFetchDailyPromptsParams {
  startDate?: string
  endDate?: string
}

export const fetchDailyPrompts = async ({
  startDate,
  endDate,
}: IFetchDailyPromptsParams = {}): Promise<IDailyPrompt[]> => {
  const searchParams = new URLSearchParams()

  if (startDate) searchParams.set('start_date', startDate)
  if (endDate) searchParams.set('end_date', endDate)

  const queryString = searchParams.toString()
  const res = await apiFetch(
    `/daily_prompts${queryString ? `?${queryString}` : ''}`,
  )

  return res.json()
}

export const fetchDailyPrompt = async (
  date: string,
): Promise<IDailyPrompt | null> => {
  const res = await apiFetch(`/daily_prompts/${date}`)
  if (res.status === 404) return null
  return res.json()
}

export const upsertDailyPrompt = async (
  date: string,
  body: string,
): Promise<UpsertDailyPromptResult> => {
  const res = await apiFetch(`/daily_prompts/${date}`, {
    method: 'PATCH',
    body: JSON.stringify({ body }),
  })
  return res.json()
}
