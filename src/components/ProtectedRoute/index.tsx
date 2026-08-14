import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '~/context/auth/useAuth'

import type { TUserRole } from '~/types/auth'
import type { ReactElement } from 'react'

type ProtectedRouteProps = {
  allowedRoles?: TUserRole[]
}

const ProtectedRoute = ({
  allowedRoles,
}: ProtectedRouteProps): ReactElement => {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  if (!user) return <Navigate to="/login" replace />

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
