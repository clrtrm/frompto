import { useState, useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { apiFetch, getAuthToken, setAuthToken } from '~/api/client'
import type { IUser, TUserRole } from '~/types/auth'
import { AuthContext } from './AuthContext'
import type { ISignInParams, ISignUpParams } from './AuthContext'

interface IUserFromResponse {
  id: string
  email: string
  username: string
  display_name: string
  role: TUserRole
}

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null)

  const [loading, setLoading] = useState(true)

  const rebindUserFromSnakeCaseToCamelCase = (
    raw: IUserFromResponse,
  ): IUser => ({
    id: raw.id,
    email: raw.email,
    username: raw.username,
    displayName: raw.display_name,
    role: raw.role,
  })

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
          setUser(rebindUserFromSnakeCaseToCamelCase(data.user))
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

    setUser(rebindUserFromSnakeCaseToCamelCase(data.user))
  }

  const logout = async () => {
    await apiFetch('/logout', { method: 'DELETE' })
    setAuthToken(null)
    setUser(null)
  }

  const signUp = async (user: ISignUpParams) => {
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
      throw new Error(data.error)
    }

    setUser(rebindUserFromSnakeCaseToCamelCase(data.user))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
