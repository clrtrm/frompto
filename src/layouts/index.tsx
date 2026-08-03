import { Outlet } from 'react-router-dom'

import NavBar from '~/components/NavBar'
import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { ReactElement } from 'react'

import './styles.scss'

const Layout = (): ReactElement => {
  useDocumentTitle('Cozy Check-ins with Strangers')

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
