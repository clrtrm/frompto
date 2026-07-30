import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import type { ReactElement, SubmitEventHandler } from 'react'
import { apiFetch } from '~/api/client'
import useAuth from '~/context/auth/useAuth'
import type { IDailyPrompt } from '~/types/dailyPrompt'
import {
  createReply,
  flattenCreateReplyErrors,
  type IApiErrors,
} from '~/api/replies'
import Button from '~/components/Button'
import Form from '~/components/Form'

import './styles.scss'

const HomePage = (): ReactElement => {
  /** Local state */
  const { user } = useAuth()
  const [dailyPrompt, setDailyPrompt] = useState<IDailyPrompt | null>(null)
  const [loading, setLoading] = useState(true)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [replyBody, setReplyBody] = useState<string>('')

  const repliesCount = dailyPrompt?.replies?.length || 0

  /** Handlers */

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!dailyPrompt) return

    try {
      await createReply(dailyPrompt.date, replyBody)
      setFormErrors([])
    } catch (err) {
      const apiErrors = err as IApiErrors
      setFormErrors(
        apiErrors?.errors
          ? flattenCreateReplyErrors(apiErrors.errors)
          : ['Something went wrong'],
      )
    }
  }

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
          <Form errors={formErrors} onSubmit={handleSubmit}>
            <textarea
              minLength={3}
              placeholder="Be loud and proud..."
              onChange={(e) => setReplyBody(e.target.value)}
              name="replyBody"
              rows={6}
              id=""
              value={replyBody}
            />
            <Button label="Answer now" disabled={replyBody.trim().length < 3} />
          </Form>
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
