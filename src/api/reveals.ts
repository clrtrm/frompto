import { apiFetch } from './client'

import type { IReveal } from '~/types/reveal'

interface IFetchRevealPayload {
  date: string
}

export type RevealResult =
  | { status: 'ok'; data: IReveal }
  | { status: 'not_found' }
  | { status: 'forbidden'; reason: 'not_yet_revealed' | 'reply_required' }

export const fetchReveal = async ({
  date,
}: IFetchRevealPayload): Promise<RevealResult> => {
  const res = await apiFetch(`/reveals/${date}`)

  if (res.status === 404) return { status: 'not_found' }
  if (res.status === 403) {
    const body = (await res.json()) as {
      reason: 'not_yet_revealed' | 'reply_required'
    }
    return { status: 'forbidden', reason: body.reason }
  }
  const data = (await res.json()) as IReveal
  return { status: 'ok', data }
}
