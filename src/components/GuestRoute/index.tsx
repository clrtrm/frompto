import { Navigate, Outlet } from 'react-router-dom'
import type { ReactElement } from 'react'
import useAuth from '~/context/auth/useAuth'

const GuestRoute = (): ReactElement => {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  if (user) return <Navigate to="/" replace />

  return <Outlet />
}

export default GuestRoute
