export type TUserRole = 'admin' | 'member'

export interface IUser {
  id: string
  email: string
  username: string
  displayName: string
  role: TUserRole
}
