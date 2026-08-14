import { apiFetch } from './client'

import type { IReveal } from '~/types/reveal'
import type { IRevealSummary } from '~/types/reveal'

interface IFetchRevealPayload {
  date: string
}

export type RevealForbiddenReason = 'not_yet_revealed' | 'reply_required'

export type RevealResult =
  | { status: 'ok'; data: IReveal }
  | { status: 'not_found' }
  | { status: 'forbidden'; reason: RevealForbiddenReason }

export const fetchReveal = async ({
  date,
}: IFetchRevealPayload): Promise<RevealResult> => {
  const res = await apiFetch(`/reveals/${date}`)

  if (res.status === 404) return { status: 'not_found' }

  if (res.status === 403) {
    const body = (await res.json()) as { reason: RevealForbiddenReason }
    return { status: 'forbidden', reason: body.reason }
  }

  const data = (await res.json()) as IReveal
  return { status: 'ok', data }
}

export const fetchReveals = async (): Promise<IRevealSummary[]> => {
  const res = await apiFetch('/reveals')
  return res.json()
}
