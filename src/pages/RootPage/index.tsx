import type { ReactElement } from "react"
import { useAuth } from "../../context/auth/useAuth"
import HomePage from "../Home"
import LandingPage from "../Landing"

const RootPage = (): ReactElement => {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    return user ? <HomePage /> : <LandingPage />
}

export default RootPage