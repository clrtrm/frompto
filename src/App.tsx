import { Route, Routes } from 'react-router-dom'

import GuestRoute from '~/components/GuestRoute'
import ProtectedRoute from '~/components/ProtectedRoute'
import Layout from '~/layouts'
import SignUpPage from '~/pages/Auth/SignUp'
import ConfirmEmailPage from '~/pages/ConfirmEmail'
import DashboardPage from '~/pages/Dashboard'
import LoginPage from '~/pages/Login'
import NotFoundPage from '~/pages/NotFound'
import ProfilePage from '~/pages/Profile'
import RevealPage from '~/pages/Reveal'
import RootPage from '~/pages/RootPage'

import type { ReactElement } from 'react'

const App = (): ReactElement => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<RootPage />} />
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reveals/:date" element={<RevealPage />} />
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
