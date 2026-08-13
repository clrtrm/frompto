import { apiFetch, setAuthToken } from './client'

import type { IApiErrors } from './errors'
import type { ISignInParams, ISignUpParams } from '~/context/auth/AuthContext'
import type { IUser } from '~/types/auth'

export const fetchCurrentUser = async (): Promise<IUser | null> => {
  const res = await apiFetch('/me')

  if (!res.ok) {
    setAuthToken(null)
    return null
  }

  const data = (await res.json()) as { user: IUser }

  return data.user
}

export const login = async (params: ISignInParams): Promise<IUser> => {
  const res = await apiFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ user: params }),
  })

  const data = (await res.json()) as unknown

  if (!res.ok) {
    throw data as IApiErrors
  }

  return (data as { user: IUser }).user
}

export const logout = async (): Promise<void> => {
  await apiFetch('/logout', { method: 'DELETE' })
  setAuthToken(null)
}

export const signUp = async (params: ISignUpParams): Promise<string> => {
  const res = await apiFetch('/signup', {
    method: 'POST',
    body: JSON.stringify({
      user: {
        email: params.email,
        password: params.password,
        display_name: params.displayName,
      },
    }),
  })

  const data = (await res.json()) as unknown

  if (!res.ok) {
    throw data as IApiErrors
  }

  return (data as { message: string }).message
}
