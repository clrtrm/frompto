import type { IUser } from './auth'

export interface IReply {
  id: number
  body: string
  author: IUser
}
