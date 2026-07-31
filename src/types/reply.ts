import type { IUser } from '~/types/auth'

export interface IReply {
  id: number
  body: string
  author: IUser
}
