import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import PageTitle from '~/components/PageTitle'
import { ISO_DATE_REGEX } from '~/const'
import useReveal from '~/hooks/useReveal'
import NotFoundPage from '~/pages/NotFound'

import type { ReactElement } from 'react'

import './styles.scss'

const RevealPage = (): ReactElement => {
  /** Hooks */

  const { date } = useParams<{ date: string }>()
  const isValidDate = ISO_DATE_REGEX.test(date ?? '')
  const { result, isLoading } = useReveal(isValidDate ? (date as string) : '')

  /** Render */
  if (!isValidDate) {
    return <NotFoundPage />
  }

  if (isLoading) {
    return <p className="loader">Loading...</p>
  }

  if (!result || result.status === 'not_found') {
    return <NotFoundPage />
  }

  if (result.status === 'forbidden') {
    return (
      <div className="reveal-page">
        <div className="not-found-page">
          {result.reason === 'not_yet_revealed' ? (
            <>
              <PageTitle textContent="Too soon" />
              <p>
                Today&apos;s reveal isn&apos;t available yet — check back after
                10am tomorrow!
              </p>
            </>
          ) : (
            <>
              <PageTitle textContent="Access denied 🥷" />
              <p>
                You cannot see everyone else&apos;s reply without sending yours!
              </p>
            </>
          )}
          <Link to="/">Go home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="reveal-page">
      <div className="reveal-page__header">
        <span className="prompt-date">
          Question for {dayjs(result.data.date).format('MMMM D, YYYY')}
        </span>
        <PageTitle className="prompt-body" textContent={result.data.body} />
      </div>
      <div className="reveal-page__body">
        <div className="reveal-page__body__replies">
          {result.data.replies.map(({ id, author, body }) => (
            <div key={id} className="reply">
              <span className="reply__author-name">
                {author.displayNameOrUsername}:
              </span>
              <span className="reply__body">{body}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RevealPage
