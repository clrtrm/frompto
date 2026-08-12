import type { IReply } from '~/types/reply'

export interface IReveal {
  id: number
  date: string
  body: string
  replies: IReply[]
}

export interface IRevealSummary {
  date: string
  body: string
  locked: boolean
}
