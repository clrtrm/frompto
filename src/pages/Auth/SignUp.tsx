import { useState } from 'react'

import FormField from '~/components/auth/FormField'
import useAuth from '~/context/auth/useAuth'
import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { SubmitEventHandler } from 'react'

const SignUp = () => {
  /** Hooks */
  useDocumentTitle('Sign up')
  const { signUp } = useAuth()

  /** Local State */
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  /** Handlers */
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (password !== passwordConfirmation) {
      setFormError('Passwords must match')
      return
    }

    try {
      const message = await signUp({ email, password, displayName })
      setFormError('')
      setSuccessMessage(message)
    } catch (e: unknown) {
      setFormError(
        e instanceof Error
          ? e.message
          : 'Something went wrong. 😖 Please check your information and try again.',
      )
    }
  }

  /** Render */
  return successMessage ? (
    <div className="signup-success">
      <h1>Almost there!</h1>
      <p>
        Signed up successfully! Please check your inbox and confirm your email
        to activate your account.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <h1>Create a new account</h1>
      {formError ? <div className="form-errors">{formError}</div> : null}
      <FormField
        autoComplete="username"
        id="email"
        label="Email"
        onChange={setEmail}
        placeholder="Your email"
        required
        type="email"
        value={email}
      />
      <FormField
        autoComplete="off"
        id="displayName"
        label="Display name"
        value={displayName}
        onChange={setDisplayName}
        placeholder="Display name"
      />
      <FormField
        autoComplete="new-password"
        id="password"
        label="Password"
        maxLength={128}
        minLength={6}
        onChange={setPassword}
        placeholder="Your password"
        required
        type="password"
        value={password}
      />
      <FormField
        id="password_confirmation"
        label="Password confirmation"
        maxLength={128}
        minLength={6}
        onChange={setPasswordConfirmation}
        placeholder="Confirm your password"
        required
        type="password"
        value={passwordConfirmation}
      />
      <button type="submit">Sign up</button>
    </form>
  )
}

export default SignUp
