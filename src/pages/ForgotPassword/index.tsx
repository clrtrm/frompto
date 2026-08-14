import { useState } from 'react'

import { requestPasswordReset } from '~/api/password'
import Button from '~/components/Button'
import Form from '~/components/Form'

import type { IApiErrors } from '~/api/errors'
import type { ReactElement, SubmitEventHandler } from 'react'

const ForgotPasswordForm = (): ReactElement => {
  /** Local State */
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  /** Handlers */
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    try {
      await requestPasswordReset(email)
      setSubmitted(true)
      setErrors([])
    } catch (err) {
      const apiErrors = err as IApiErrors
      setErrors(apiErrors?.errors ?? ['Something went wrong'])
    }
  }

  /** Render */
  return submitted ? (
    <p>If that email exists, check your inbox for reset instructions.</p>
  ) : (
    <Form
      className="forgot-password-form"
      errors={errors}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Button
        label="Send reset instructions"
        disabled={email.trim().length === 0}
      />
    </Form>
  )
}

export default ForgotPasswordForm
