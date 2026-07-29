import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { apiFetch } from '~/api/client'
import Button from '~/components/Button'
import useAuth from '~/context/auth/useAuth'
import type { IDailyPrompt } from '~/types/dailyPrompt'

import './styles.scss'

const HomePage = (): ReactElement => {
  /** Local state */
  const { user } = useAuth()
  const [dailyPrompt, setDailyPrompt] = useState<IDailyPrompt | null>(null)
  const [loading, setLoading] = useState(true)

  const repliesCount = dailyPrompt?.replies?.length || 0

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
      <span className="greeting">Welcome back, {user?.displayName}</span>
      <span className="today-date">
        {dayjs().format('dddd MMMM DD, YYYY')}:
      </span>
      {loading ? (
        <p className="loader">Loading...</p>
      ) : dailyPrompt ? (
        <div className="prompt-container">
          <span className="prompt-body">{dailyPrompt.body}</span>
          <Button label="Answer now" />
          <span className="peer-pressure">
            {repliesCount === 1
              ? '1 person has already replied'
              : repliesCount > 1
                ? `${repliesCount} have already replied`
                : 'Nobody has replied yet. Be the first! 👀'}
          </span>
        </div>
      ) : (
        <p>No prompt for today yet.</p>
      )}
    </div>
  )
}

export default HomePage
