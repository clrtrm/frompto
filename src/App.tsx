import type { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from "./layouts"
import Login from './pages/Login.tsx'
import ProfilePage from './pages/Profile/index.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import NotFoundPage from './pages/NotFound/index.tsx'
import RootPage from './pages/RootPage/index.tsx'

const App = (): ReactElement => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route index element={<RootPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App