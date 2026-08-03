import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '~/hooks/useDocumentTitle'

const NotFoundPage = (): ReactElement => {
  useDocumentTitle('Oh no >:{')

  return (
    <div>
      <h1>Not found</h1>
      <Link to="/">Go home</Link>
    </div>
  )
}

export default NotFoundPage
