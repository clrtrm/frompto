import { useEffect, useState } from 'react'

import { apiFetch, getAuthToken, setAuthToken } from '~/api/client'

import { AuthContext } from './AuthContext'

import type { ISignInParams, ISignUpParams } from './AuthContext'
import type { IUser } from '~/types/auth'
import type { PropsWithChildren } from 'react'

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const restoreSession = async () => {
      if (!getAuthToken()) {
        setLoading(false)
        return
      }
      try {
        const res = await apiFetch('/me')
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          setAuthToken(null)
        }
      } finally {
        setLoading(false)
      }
    }
    restoreSession()
  }, [])

  const login = async (user: ISignInParams) => {
    const res = await apiFetch('/login', {
      method: 'POST',
      body: JSON.stringify({ user }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error)
    }

    setUser(data.user)
  }

  const logout = async () => {
    await apiFetch('/logout', { method: 'DELETE' })
    setAuthToken(null)
    setUser(null)
  }

  const signUp = async (user: ISignUpParams): Promise<string> => {
    const res = await apiFetch('/signup', {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: user.email,
          password: user.password,
          display_name: user.displayName,
        },
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.errors?.[0] ?? data.error ?? 'Sign up failed.')
    }

    return data.message
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
