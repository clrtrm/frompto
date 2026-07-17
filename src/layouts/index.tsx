import type { ReactElement } from "react"
import NavBar from "../components/NavBar"
import './styles.css'

const Layout = (): ReactElement => {
    return (
        <div className="layout">
            <NavBar />
        </div>)
}

export default Layout