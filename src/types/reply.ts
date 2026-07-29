import type { IUser } from './auth'

export interface IReply {
  body: string
  author: IUser
}
