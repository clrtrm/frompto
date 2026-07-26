import { useState } from 'react'
import type { SubmitEventHandler } from 'react'
import useAuth from '~/context/auth/useAuth'
import FormField from '~/components/auth/FormField'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [formError, setFormError] = useState('')

  const { signUp } = useAuth()

  const navigate = useNavigate()

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (password !== passwordConfirmation) {
      setFormError('Passwords must match')
      return
    }

    try {
      await signUp({ email, password, displayName })
      navigate('/')
    } catch (e: unknown) {
      setFormError(
        e instanceof Error
          ? e.message
          : 'Something went wrong. 😖 Please check your information and try again.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a new account</h1>
      {formError ? <div className="form-errors">{formError}</div> : null}
      <FormField
        autoComplete="username"
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="Your email"
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
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Your password"
      />
      <FormField
        id="password_confirmation"
        label="Password confirmation"
        type="password"
        value={passwordConfirmation}
        onChange={setPasswordConfirmation}
        placeholder="Confirm your password"
      />
      <button type="submit">Sign up</button>
    </form>
  )
}

export default SignUp
