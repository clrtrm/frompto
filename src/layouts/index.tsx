import { Outlet } from "react-router-dom"
import type { ReactElement } from "react"
import NavBar from "../components/NavBar"
import './styles.scss'

const Layout = (): ReactElement => {
    return (
        <div className="layout">
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Layout