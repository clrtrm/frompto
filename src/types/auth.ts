export type TUserRole = 'admin' | 'member'

export interface IUser {
  id: number
  email: string
  username: string
  display_name: string
  role: TUserRole
}
