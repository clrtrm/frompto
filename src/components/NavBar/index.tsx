import type { ReactElement } from "react"
import { useAuth } from "../../context/auth/useAuth"
import { useNavigate } from "react-router-dom"
import './styles.css'

const NavBar = (): ReactElement => {
    /** Local state */
    const { user, logout } = useAuth()

    const navigate = useNavigate()

    /** Handlers */
    const handleLogoutButtonClick = async () => {
        await logout()
        navigate('/login')
    }

    /** Render */
    return (
        <div className="navbar-component">
            {user ?
                <>
                    <p>Welcome, {user.display_name}!</p>
                    <button onClick={handleLogoutButtonClick}>Log out</button>
                </> : null}
        </div>
    )
}

export default NavBar