import { apiFetch } from '~/api/client'
import type { IDailyPrompt } from '~/types/dailyPrompt'

export const fetchDailyPrompts = async (): Promise<IDailyPrompt[]> => {
  const res = await apiFetch('/daily_prompts')
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
): Promise<IDailyPrompt> => {
  const res = await apiFetch(`/daily_prompts/${date}`, {
    method: 'PATCH',
    body: JSON.stringify({ body }),
  })
  return res.json()
}
