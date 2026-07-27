import { useState } from 'react'
import type { SubmitEventHandler } from 'react'
import useAuth from '~/context/auth/useAuth'
import FormField from '~/components/auth/FormField'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'

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
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
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
  )
}

export default Login
