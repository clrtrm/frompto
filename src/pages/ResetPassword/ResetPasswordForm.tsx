import { useState } from 'react'

import { resetPassword } from '~/api/password'
import Button from '~/components/Button'
import Form from '~/components/Form'

import type { IApiErrors } from '~/api/errors'
import type { ReactElement, SubmitEventHandler } from 'react'

interface Props {
  resetPasswordToken: string
}

const ResetPasswordForm = ({ resetPasswordToken }: Props): ReactElement => {
  /** Local State */
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  /** Handlers */
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    try {
      await resetPassword(resetPasswordToken, password, passwordConfirmation)
      setSuccess(true)
      setErrors([])
    } catch (err) {
      const apiErrors = err as IApiErrors
      setErrors(
        apiErrors?.errors ?? [
          'Unable to reset password. The link may have expired.',
        ],
      )
    }
  }

  /** Render */
  return success ? (
    <p>Your password has been updated. You can now log in.</p>
  ) : (
    <Form
      className="reset-password-form"
      errors={errors}
      onSubmit={handleSubmit}
    >
      <label htmlFor="password">New password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <label htmlFor="passwordConfirmation">Confirm password</label>
      <input
        id="passwordConfirmation"
        type="password"
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        required
      />
      <Button
        label="Reset password"
        disabled={password.length === 0 || passwordConfirmation.length === 0}
      />
    </Form>
  )
}

export default ResetPasswordForm
