import { apiFetch } from '~/api/client'

export type DailyPrompt = {
  id: number
  date: string
  body: string
}

export const fetchDailyPrompts = async (): Promise<DailyPrompt[]> => {
  const res = await apiFetch('/daily_prompts')
  return res.json()
}

export const fetchDailyPrompt = async (
  date: string,
): Promise<DailyPrompt | null> => {
  const res = await apiFetch(`/daily_prompts/${date}`)
  if (res.status === 404) return null
  return res.json()
}

export const upsertDailyPrompt = async (
  date: string,
  body: string,
): Promise<DailyPrompt> => {
  const res = await apiFetch(`/daily_prompts/${date}`, {
    method: 'PATCH',
    body: JSON.stringify({ body }),
  })
  return res.json()
}
