import type { ReactElement } from 'react'
import useAuth from '~/context/auth/useAuth'
import { NavLink, useNavigate } from 'react-router-dom'
import type { TUserRole } from '~/types/auth'

import './styles.scss'

type TNavigationLocation = {
  label: string
  path: string
  scope?: TUserRole[]
}

const NAVIGATION_LOCATION: TNavigationLocation[] = [
  { label: 'Profile', path: '/profile' },
  // { label: 'Dashboard', path: '/dashboard', scope: ['admin'] },
]

const NavBar = (): ReactElement => {
  /** Local state */
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const visibleLocations = NAVIGATION_LOCATION.filter(({ scope }) => {
    if (!scope) return true
    return user?.role && scope.includes(user.role)
  })

  const navLinks = visibleLocations.map(({ label, path }) => (
    <li key={path}>
      <NavLink to={path}>{label}</NavLink>
    </li>
  ))

  /** Handlers */
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  /** Render */
  return (
    <div className="navbar-component">
      <nav className="navigation" aria-label="main">
        <div className="navigation__left">
          <div className="logo">
            <NavLink to="/">Prompto</NavLink>
          </div>
        </div>
        <div className="navigation__right">
          <div className="nav-links">
            <ul>{navLinks}</ul>
          </div>
          {user ? (
            <div className="auth-actions auth-actions--authenticated">
              <p>Hello, {user.display_name}!</p>
              <button onClick={handleLogout}>Sign out</button>
            </div>
          ) : (
            <div className="auth-actions auth-actions--not-authenticated">
              <NavLink to="/login">Sign in</NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
