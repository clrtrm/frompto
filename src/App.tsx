import { Route, Routes } from 'react-router-dom'

import GuestRoute from '~/components/GuestRoute'
import ProtectedRoute from '~/components/ProtectedRoute'
import Layout from '~/layouts'
import ConfirmEmailPage from '~/pages/ConfirmEmail'
import DashboardPage from '~/pages/Dashboard'
import ForgotPasswordPage from '~/pages/ForgotPassword'
import LoginPage from '~/pages/Login'
import NotFoundPage from '~/pages/NotFound'
import ProfilePage from '~/pages/Profile'
import ResetPasswordPage from '~/pages/ResetPassword'
import RevealPage from '~/pages/Reveal'
import RevealsPage from '~/pages/Reveals'
import RootPage from '~/pages/RootPage'
import SignUpPage from '~/pages/SignUp'

import type { ReactElement } from 'react'

const App = (): ReactElement => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<RootPage />} />
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/password/edit" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reveals/:date" element={<RevealPage />} />
          <Route path="/reveals" element={<RevealsPage />} />
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
