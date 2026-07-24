import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = (): ReactElement => {
  return (
    <div>
      <h1>Not found</h1>
      <Link to="/">Go home</Link>
    </div>
  )
}

export default NotFoundPage
