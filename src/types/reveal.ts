import type { IReply } from '~/types/reply'

export interface IReveal {
  id: number
  date: string
  body: string
  replies: IReply[]
}
