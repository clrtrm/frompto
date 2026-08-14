import type { IReply } from '~/types/reply'

export interface IDailyPrompt {
  id: number
  date: string
  body: string
  replies: IReply[]
  createdAt: string
  updatedAt: string
}

export type TDailyPrompt = Pick<IDailyPrompt, 'id' | 'date' | 'body'>
