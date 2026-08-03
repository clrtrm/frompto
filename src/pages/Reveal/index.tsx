import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'

import NotFoundPage from '~/pages/NotFound'
import { ISO_DATE_REGEX } from '~/const'
import { fetchReveal } from '~/api/reveals'
import type { IReveal } from '~/types/reveal'
import type { RevealResult } from '~/api/reveals'
import useDocumentTitle from '~/hooks/useDocumentTitle'

import './styles.scss'

const RevealPage = (): ReactElement => {
  /** Hooks */
  useDocumentTitle('La Place du Village')

  const { date } = useParams<{ date: string }>()

  /** Local state */
  const [loading, setLoading] = useState(true)
  const [reveal, setReveal] = useState<IReveal | null>(null)
  const [status, setStatus] = useState<RevealResult['status'] | null>(null)

  /** Effects */
  useEffect(() => {
    if (!date || !ISO_DATE_REGEX.test(date)) return

    const loadReveal = async () => {
      try {
        const result = await fetchReveal({ date })
        setStatus(result.status)
        if (result.status === 'ok') setReveal(result.data)
      } catch (error) {
        console.error('Failed to fetch reveal:', error)
        setStatus('not_found')
      } finally {
        setLoading(false)
      }
    }

    loadReveal()
  }, [date])

  /** Render */
  if (!ISO_DATE_REGEX.test(date ?? '')) {
    return <NotFoundPage />
  }

  if (loading) {
    return <p className="loader">Loading...</p>
  }

  if (status === 'not_found') {
    return <NotFoundPage />
  }

  if (status === 'forbidden') {
    return (
      <div className="page reveal-page">
        <p>You can&apos;t view this reveal yet.</p>
      </div>
    )
  }

  return (
    <div className="page reveal-page">
      <span className="prompt-body">{reveal?.body}</span>
      <div className="replies-list">
        {reveal?.replies.map(({ id, author, body }) => (
          <div key={id} className="reply">
            <span className="author-names">
              <span className="author-names__display-name">
                {author.displayName}
              </span>
              <span className="author-names__username">
                {` @${author.username}`}
              </span>
            </span>
            <span className="reply__right__reply-body">{body}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RevealPage
