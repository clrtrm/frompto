import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import FormField from '~/components/auth/FormField'
import Button from '~/components/Button'
import Form from '~/components/Form'
import PageTitle from '~/components/PageTitle'
import useAuth from '~/context/auth/useAuth'

import type { IApiErrors } from '~/api/errors'
import type { ReactElement, SubmitEventHandler } from 'react'

import './styles.scss'

const Login = (): ReactElement => {
  /** Hooks */
  const { login } = useAuth()
  const navigate = useNavigate()

  /** Local State */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState<string[]>([])

  /** Handlers */
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    try {
      await login({ email, password })
      setFormErrors([])
      navigate('/')
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
    <div className="login-page">
      <PageTitle textContent="Sign in" />
      <div className="login-page__body">
        <Form
          errors={formErrors}
          onSubmit={handleSubmit}
          className="login-form"
        >
          <FormField
            id="email"
            label="Email"
            onChange={setEmail}
            placeholder="Email"
            required
            type="email"
            value={email}
          />
          <FormField
            id="password"
            label="Password"
            onChange={setPassword}
            placeholder="Password"
            required
            type="password"
            value={password}
          />
          <Button label="Log in" type="submit" />
        </Form>
        <Link className="forgot-password-link" to="/forgot-password">
          Forgot password?
        </Link>
      </div>
    </div>
  )
}

export default Login
