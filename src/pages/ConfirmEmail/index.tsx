import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { apiFetch } from '~/api/client'
import PageTitle from '~/components/PageTitle'

import type { ReactElement } from 'react'

import './styles.scss'

type Status = 'confirming' | 'success' | 'error'

const ConfirmEmail = (): ReactElement => {
  /** Hooks */
  const [searchParams] = useSearchParams()

  /** Local State */
  const token = searchParams.get('confirmation_token')
  const [status, setStatus] = useState<Status>(token ? 'confirming' : 'error')
  const [errorMessage, setErrorMessage] = useState<string | null>(
    token ? null : 'Missing confirmation token.',
  )

  /** Helpers */
  const confirmToken = async (confirmationToken: string): Promise<void> => {
    try {
      const res = await apiFetch(
        `/confirmation?confirmation_token=${confirmationToken}`,
        {
          method: 'GET',
        },
      )

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setErrorMessage(data.errors?.[0] ?? 'Unable to confirm your email.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  /** Effects */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (token) void confirmToken(token)
  }, [token])

  /** Render */
  return (
    <div className="confirm-email-page">
      {status === 'confirming' ? (
        <>
          <PageTitle textContent="Confirming your email..." />
          <p>🏃🏃🏃</p>
        </>
      ) : null}

      {status === 'success' ? (
        <>
          <PageTitle textContent="Success!" />
          <p>Your email has been confirmed!</p>
          <Link to="/login">Log in</Link>
        </>
      ) : null}

      {status === 'error' ? (
        <>
          <PageTitle textContent="Uh oh..." />
          <p>{errorMessage}.</p>
          <Link to="/login">Back to login</Link>
        </>
      ) : null}
    </div>
  )
}

export default ConfirmEmail
