import { useState } from 'react'

import FormField from '~/components/auth/FormField'
import Button from '~/components/Button'
import PageTitle from '~/components/PageTitle'
import useAuth from '~/context/auth/useAuth'

import type { SubmitEventHandler } from 'react'

import './styles.scss'

const SignUp = () => {
  /** Hooks */
  const { signUp } = useAuth()

  /** Local State */
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  /** Handlers */
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

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
  return (
    <div className="sign-up-page">
      {successMessage ? (
        <>
          <PageTitle textContent="Almost there" />
          <div className="success-message">
            <p>
              Signed up successfully! <br /> Please check your inbox and confirm
              your email to activate your account.
            </p>
          </div>
        </>
      ) : (
        <>
          <PageTitle
            textContent="Create a new account"
            documentTitle="Sign up"
          />
          <div className="sign-up-page-main-content">
            <form className="sign-up-form" onSubmit={handleSubmit}>
              {formError ? (
                <div className="form-errors">{formError}</div>
              ) : null}
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
              <Button label="Sign up" type="submit" />
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default SignUp
