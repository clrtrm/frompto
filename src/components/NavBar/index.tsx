import { NavLink, useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import useAuth from '~/context/auth/useAuth'

import type { TUserRole } from '~/types/auth'
import type { ReactElement } from 'react'

import './styles.scss'

type TNavigationLocation = {
  label: string
  path: string
  public?: boolean
  scope?: TUserRole[]
}

const NAVIGATION_LOCATION: TNavigationLocation[] = [
  { label: 'Profile', path: '/profile' },
  { label: 'Reveals', path: `/reveals` },
  { label: 'Dashboard', path: '/dashboard', scope: ['admin'] },
]

const NavBar = (): ReactElement => {
  /** Local state */
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const visibleLocations = NAVIGATION_LOCATION.filter(
    ({ public: isPublic, scope }) => {
      if (isPublic) return true
      if (!user) return false
      if (!scope) return true
      return user?.role && scope.includes(user.role)
    },
  )

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
          <ul className="nav-links">{navLinks}</ul>
          {user ? (
            <div className="auth-actions auth-actions--authenticated">
              <p className="user-greeting">
                Hello, {user.displayNameOrUsername}!
              </p>
              <Button label="Sign out" onClick={handleLogout} />
            </div>
          ) : (
            <div className="auth-actions auth-actions--not-authenticated">
              <NavLink to="/login">Sign in</NavLink>
              <NavLink to="/signup">Sign up</NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
