const BASE_URL = 'http://localhost:3000'

let authToken: string | null = localStorage.getItem('jwt')

export const setAuthToken = (token: string | null) => {
  authToken = token
  if (token) localStorage.setItem('jwt', token)
  else localStorage.removeItem('jwt')
}

export const getAuthToken = () => authToken

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
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
