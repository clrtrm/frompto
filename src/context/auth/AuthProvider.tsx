import { useEffect, useState } from 'react'

import { fetchCurrentUser, login, logout, signUp } from '~/api/auth'
import { getAuthToken } from '~/api/client'

import { AuthContext } from './AuthContext'

import type { ISignInParams, ISignUpParams } from './AuthContext'
import type { IUser } from '~/types/auth'
import type { PropsWithChildren, ReactElement } from 'react'

const AuthProvider = ({ children }: PropsWithChildren): ReactElement => {
  /** Local State */
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  /** Handlers */
  const handleLogin = async (params: ISignInParams) => {
    const loggedInUser = await login(params)
    setUser(loggedInUser)
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  const handleSignUp = async (params: ISignUpParams): Promise<string> =>
    signUp(params)

  /** Effects */
  useEffect(() => {
    const restoreSession = async () => {
      if (!getAuthToken()) {
        setLoading(false)
        return
      }

      const currentUser = await fetchCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }

    restoreSession()
  }, [])

  /** Render */
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
        signUp: handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
