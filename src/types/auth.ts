export type TUserRole = 'admin' | 'member'

export interface IUser {
  id: number
  createdAt: string
  displayName: string | null
  displayNameOrUsername: string
  email: string
  role: TUserRole
  updatedAt: string
  username: string
}

export type IReplyUser = Pick<IUser, 'id' | 'displayNameOrUsername'>
