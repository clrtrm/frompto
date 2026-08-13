import { apiFetch } from '~/api/client'

import type { IApiErrors } from './errors'
import type { IReply } from '~/types/reply'

export const createReply = async (
  date: string,
  body: string,
): Promise<IReply> => {
  const res = await apiFetch(`/daily_prompts/${date}/replies`, {
    method: 'POST',
    body: JSON.stringify({ reply: { body } }),
  })

  const data = (await res.json()) as unknown

  if (!res.ok) {
    throw data as IApiErrors
  }

  return data as IReply
}

export const fetchReply = async (date: string): Promise<IReply | null> => {
  const res = await apiFetch(`/daily_prompts/${date}/reply`)

  if (res.status === 404) return null

  const data = (await res.json()) as unknown

  if (!res.ok) {
    throw data as IApiErrors
  }

  return data as IReply | null
}
