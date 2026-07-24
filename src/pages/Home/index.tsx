import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { apiFetch } from '~/api/client'
import useAuth from '~/context/auth/useAuth'

interface IPrompt {
  id: number
  body: string
}

interface IDailyPrompt {
  id: number
  date: string
  prompt: IPrompt
}

const HomePage = (): ReactElement => {
  /** Local state */
  const { user } = useAuth()
  const [dailyPrompt, setDailyPrompt] = useState<IDailyPrompt | null>(null)
  const [loading, setLoading] = useState(true)

  /** Effects */
  useEffect(() => {
    const fetchPrompt = async () => {
      const res = await apiFetch('/daily_prompts/today')

      if (res.ok) {
        const data: IDailyPrompt = await res.json()
        setDailyPrompt(data)
      } else {
        setDailyPrompt(null)
      }

      setLoading(false)
    }

    fetchPrompt()
  }, [])

  /** Render */
  return (
    <div className="page home-page">
      <h1>Welcome back {user?.display_name}</h1>
      <span>Your question for today {new Date().toString()}:</span>
      {loading ? (
        <p>Loading...</p>
      ) : dailyPrompt ? (
        <p>{dailyPrompt.prompt.body}</p>
      ) : (
        <p>No prompt for today yet.</p>
      )}
      <button>Answer now</button>
      People have replied already!
    </div>
  )
}

export default HomePage
