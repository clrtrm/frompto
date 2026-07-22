import { Routes, Route } from 'react-router-dom'
import Layout from "./layouts"
import Login from './pages/Login.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App