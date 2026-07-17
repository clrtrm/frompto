// src/context/auth/AuthProvider.tsx
import { useState, type ReactNode } from 'react'
import { apiFetch, setAuthToken } from '../../api/client'
import type { IUser } from '../../types/auth'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null)

    const login = async (email: string, password: string) => {
        const res = await apiFetch('/login', {
            method: 'POST',
            body: JSON.stringify({ user: { email, password } }),
        })
        if (!res.ok) throw new Error('Invalid credentials')
        const data = await res.json()
        setUser(data.user)
    }

    const logout = async () => {
        await apiFetch('/logout', { method: 'DELETE' })
        setAuthToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}