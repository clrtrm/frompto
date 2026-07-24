import type { ReactElement } from 'react'
import useAuth from '~/context/auth/useAuth'

const HomePage = (): ReactElement => {
  const { user } = useAuth()

  return (
    <div className="page home-page">
      <h1>Welcome back {user?.display_name}</h1>
      <span>Your question for today {new Date().toString()}:</span>
      <p>Why haven't aliens contacted us yet?</p>
      <button>Answer now</button>
      People have replied already!
    </div>
  )
}

export default HomePage
