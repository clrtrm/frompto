import type { IReply } from '~/types/reply'

export interface IDailyPrompt {
  id: number
  date: string
  body: string
  replies: IReply[]
}
