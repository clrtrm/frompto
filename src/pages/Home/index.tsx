import { useEffect, useState } from 'react'

import { apiFetch } from '~/api/client'
import {
  createReply,
  fetchReply,
  flattenCreateReplyErrors,
} from '~/api/replies'
import Button from '~/components/Button'
import Form from '~/components/Form'
import PageTitle from '~/components/PageTitle'

import type { IApiErrors } from '~/api/replies'
import type { IDailyPrompt } from '~/types/dailyPrompt'
import type { IReply } from '~/types/reply'
import type { ReactElement, SubmitEventHandler } from 'react'

import './styles.scss'

const HomePage = (): ReactElement => {
  /** Local state */
  const [dailyPrompt, setDailyPrompt] = useState<IDailyPrompt | null>(null)
  const [reply, setReply] = useState<IReply | null>(null)
  const [loading, setLoading] = useState(true)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [replyBody, setReplyBody] = useState<string>('')

  /** Handlers */

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!dailyPrompt) return

    try {
      const newReply = await createReply(dailyPrompt.date, replyBody)
      setReply(newReply)
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
    const fetchPromptAndReply = async () => {
      const res = await apiFetch('/daily_prompts/today')

      if (res.ok) {
        const data: IDailyPrompt = await res.json()
        setDailyPrompt(data)
        const existingReply = await fetchReply(data.date)
        setReply(existingReply)
      } else {
        setDailyPrompt(null)
      }

      setLoading(false)
    }

    fetchPromptAndReply()
  }, [])

  /** Render */
  return (
    <div className="home-page">
      {loading ? (
        <p className="loader">Loading...</p>
      ) : dailyPrompt ? (
        <>
          <div className="home-page__header">
            <span className="prompt-date">Today's question:</span>
            <PageTitle className="prompt-body" textContent={dailyPrompt.body} />
          </div>
          <div className="home-page__body">
            {reply ? (
              <div className="reply">
                <p className="reply__status">
                  You answered! Come back at 10am tomorrow to see what everyone
                  said.
                </p>
                <span className="reply__body">{reply.body}</span>
              </div>
            ) : (
              <Form
                className="reply-form"
                errors={formErrors}
                onSubmit={handleSubmit}
              >
                <textarea
                  minLength={3}
                  placeholder="Be loud and proud..."
                  onChange={(e) => setReplyBody(e.target.value)}
                  name="replyBody"
                  rows={6}
                  id=""
                  value={replyBody}
                />
                <Button
                  label="Answer now"
                  disabled={replyBody.trim().length < 3}
                />
              </Form>
            )}
          </div>
        </>
      ) : (
        <p>No prompt for today yet.</p>
      )}
    </div>
  )
}

export default HomePage
