import type { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '~/layouts'
import Login from '~/pages/Login'
import ProfilePage from '~/pages/Profile'
import ProtectedRoute from '~/components/ProtectedRoute'
import GuestRoute from '~/components/GuestRoute'
import NotFoundPage from '~/pages/NotFound'
import RootPage from '~/pages/RootPage'
import DashboardPage from '~/pages/Dashboard'
import SignUp from '~/pages/Auth/SignUp'
import RevealPage from './pages/Reveal'

const App = (): ReactElement => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<RootPage />} />
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reveal/:date" element={<RevealPage />} />
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
