import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { apiFetch, getAuthToken, setAuthToken } from '~/api/client'
import type { IUser } from '~/types/auth'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
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

  const login = async (email: string, password: string) => {
    const res = await apiFetch('/login', {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } }),
    })
    if (!res.ok) throw new Error('Invalid credentials')
    const data = await res.json()
    setUser(data.user)
  }

  const logout = async () => {
    await apiFetch('/logout', { method: 'DELETE' })
    setAuthToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
