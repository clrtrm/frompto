import type { IReply } from './reply'

export interface IDailyPrompt {
  id: number
  date: string
  body: string
  replies: IReply[]
}
