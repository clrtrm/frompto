import { createContext } from 'react'
import type { IUser } from '~/types/auth'

export interface ISignInParams {
  email: string
  password: string
}

export interface ISignUpParams {
  email: string
  password: string
  displayName: string
}

interface IAuthContext {
  user: IUser | null
  loading: boolean
  login: (params: ISignInParams) => Promise<void>
  signUp: (params: ISignUpParams) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)
