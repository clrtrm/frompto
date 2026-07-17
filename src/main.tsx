import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth/AuthProvider.tsx'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
