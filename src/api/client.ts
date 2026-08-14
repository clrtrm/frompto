const BASE_URL = import.meta.env.VITE_API_URL

let authToken: string | null = localStorage.getItem('jwt')

export const setAuthToken = (token: string | null) => {
  authToken = token
  if (token) localStorage.setItem('jwt', token)
  else localStorage.removeItem('jwt')
}

export const getAuthToken = () => authToken

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers as Record<string, string>),
  }

  if (authToken) {
    headers['Authorization'] = authToken
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const newToken = res.headers.get('Authorization')
  if (newToken) {
    setAuthToken(newToken)
  }

  return res
}
