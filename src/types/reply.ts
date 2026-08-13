import type { IReplyUser } from '~/types/auth'

export interface IReply {
  id: number
  body: string
  author: IReplyUser
}
