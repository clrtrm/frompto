import { Navigate, useSearchParams } from 'react-router-dom'

import ResetPasswordForm from './ResetPasswordForm'

import type { ReactElement } from 'react'

const ResetPasswordPage = (): ReactElement => {
  /** Hooks */
  const [searchParams] = useSearchParams()

  /** Local State */
  const resetPasswordToken = searchParams.get('reset_password_token')

  /** Render */
  return resetPasswordToken ? (
    <ResetPasswordForm resetPasswordToken={resetPasswordToken} />
  ) : (
    <Navigate to="/forgot-password" replace />
  )
}

export default ResetPasswordPage
