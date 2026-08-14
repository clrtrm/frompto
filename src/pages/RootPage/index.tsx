import useAuth from '~/context/auth/useAuth'
import HomePage from '~/pages/Home'
import LandingPage from '~/pages/Landing'

import type { ReactElement } from 'react'

const RootPage = (): ReactElement => {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  return user ? <HomePage /> : <LandingPage />
}

export default RootPage
