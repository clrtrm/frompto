import { Link } from 'react-router-dom'

import PageTitle from '~/components/PageTitle'
import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { ReactElement } from 'react'

import './styles.scss'

const NotFoundPage = (): ReactElement => {
  useDocumentTitle('Oh no >:{')

  const gitHubURL = import.meta.env.VITE_GITHUB_URL

  return (
    <div className="not-found-page">
      <PageTitle textContent="Not found" />
      <p>
        The requested resource could not be found. <br />
        Please check your spelling in the URL or
        <a href={gitHubURL}> reach out to us</a> if you believe something's on
        our side!
      </p>
      <Link to="/">Go home</Link>
    </div>
  )
}

export default NotFoundPage
