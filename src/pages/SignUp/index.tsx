import { useState } from 'react'

import FormField from '~/components/auth/FormField'
import Button from '~/components/Button'
import Form from '~/components/Form'
import PageTitle from '~/components/PageTitle'
import useAuth from '~/context/auth/useAuth'

import type { IApiErrors } from '~/api/errors'
import type { ReactElement, SubmitEventHandler } from 'react'

import './styles.scss'

const SignUp = (): ReactElement => {
  /** Hooks */
  const { signUp } = useAuth()

  /** Local State */
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState('')

  /** Handlers */
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    try {
      const message = await signUp({ email, password, displayName })
      setFormErrors([])
      setSuccessMessage(message)
    } catch (err) {
      const apiErrors = err as IApiErrors
      setFormErrors(
        apiErrors?.errors ?? [
          'Something went wrong. 😖 Please check your information and try again.',
        ],
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
            <Form
              className="sign-up-form"
              errors={formErrors}
              onSubmit={handleSubmit}
            >
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
                helper="Optional. You can change it later."
                id="displayName"
                label="Display name"
                value={displayName}
                maxLength={50}
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
                helper="At least 6 characters. Do your best to make it secure. 🥷"
                placeholder="Your password"
                required
                type="password"
                value={password}
              />
              <Button label="Sign up" type="submit" />
            </Form>
          </div>
        </>
      )}
    </div>
  )
}

export default SignUp
