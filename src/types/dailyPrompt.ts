import type { IUser } from './auth'

export interface IDailyPrompt {
  id: number
  date: string
  body: string
  replies: IReply[]
}

interface IReply {
  body: string
  author: IUser
}
