import { useState, type FormEvent } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '~/context/auth/useAuth'
import {} from 'react-router-dom'

export default function Login() {
  /** Local state */

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [error, setError] = useState<string | null>(null)

  const { loading, login, user } = useAuth()

  const navigate = useNavigate()

  /** Handlers */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch {
      setError('Invalid email or password')
    }
  }

  /** Render */
  if (loading) return <div>Loading...</div>

  if (user) return <Navigate to="/" replace />

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  )
}
