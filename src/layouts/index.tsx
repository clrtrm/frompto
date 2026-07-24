import { Outlet } from 'react-router-dom'
import type { ReactElement } from 'react'
import NavBar from '~/components/NavBar'

import './styles.scss'

const Layout = (): ReactElement => {
  return (
    <div className="layout">
      <NavBar />
      <div className="layout__page-container">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
