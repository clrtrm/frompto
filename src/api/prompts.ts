import { apiFetch } from '~/api/client'

export type Prompt = {
  id: number
  body: string
}

export const fetchPrompts = async (): Promise<Prompt[]> => {
  const res = await apiFetch('/prompts')
  return res.json()
}
