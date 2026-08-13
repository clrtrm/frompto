import { apiFetch } from './client'

import type { IApiErrors } from './errors'

export const requestPasswordReset = async (email: string): Promise<void> => {
  const res = await apiFetch('/password', {
    method: 'POST',
    body: JSON.stringify({ user: { email } }),
  })

  if (!res.ok) {
    const data = (await res.json()) as unknown
    throw data as IApiErrors
  }
}

export const resetPassword = async (
  resetPasswordToken: string,
  password: string,
  passwordConfirmation: string,
): Promise<void> => {
  const res = await apiFetch('/password', {
    method: 'PUT',
    body: JSON.stringify({
      user: {
        reset_password_token: resetPasswordToken,
        password,
        password_confirmation: passwordConfirmation,
      },
    }),
  })

  if (!res.ok) {
    const data = (await res.json()) as unknown
    throw data as IApiErrors
  }
}
