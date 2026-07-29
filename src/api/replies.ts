import { apiFetch } from '~/api/client'
import type { IReply } from '~/types/reply'

export const createReply = async (
  date: string,
  body: string,
): Promise<IReply> => {
  const res = await apiFetch(`/daily_prompts/${date}/replies`, {
    method: 'POST',
    body: JSON.stringify({ reply: { body } }),
  })
  return res.json()
}
