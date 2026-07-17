import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth/useAuth'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        try {
            await login(email, password)
            navigate('/')
        } catch {
            setError('Invalid email or password')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Log in</h1>
            {error ? <p style={{ color: 'red' }}>{error}</p> : null}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Log in</button>
        </form>)
}