import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import FormField from '~/components/auth/FormField'
import Button from '~/components/Button'
import PageTitle from '~/components/PageTitle'
import useAuth from '~/context/auth/useAuth'

import type { SubmitEventHandler } from 'react'

import './styles.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const { login } = useAuth()

  const navigate = useNavigate()

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    try {
      await login({ email, password })
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
    <div className="login-page">
      <PageTitle textContent="Sign in" />
      <div className="login-page__body">
        <form onSubmit={handleSubmit} className="login-form">
          {formError ? <div className="form-errors">{formError}</div> : null}
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
        </form>
        <Link className="forgot-password-link" to="/forgot-password">
          Forgot password?
        </Link>
      </div>
    </div>
  )
}

export default Login
