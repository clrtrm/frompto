import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FormField from '~/components/auth/FormField'
import Button from '~/components/Button'
import PageTitle from '~/components/PageTitle'
import useAuth from '~/context/auth/useAuth'
import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { SubmitEventHandler } from 'react'

import './styles.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  useDocumentTitle('Sign in')

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
      <PageTitle textContent="Log in" />
      <div className="login-page-main-content">
        <form onSubmit={handleSubmit} className="login-form">
          {formError ? <div className="form-errors">{formError}</div> : null}
          <FormField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
          />
          <Button label="Log in" type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Login
