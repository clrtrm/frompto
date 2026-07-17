import type { ReactElement } from "react"
import { useAuth } from "../../context/auth/useAuth"
import './styles.css'

const NavBar = (): ReactElement => {
    const { user } = useAuth()

    return (
        <div className="navbar-component">
            {user ?
                <>
                    <p>Welcome, {user.display_name}!</p>
                </> : null}
        </div>
    )
}

export default NavBar