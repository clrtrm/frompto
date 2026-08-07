import type { ReactElement } from 'react'

import './styles.scss'

interface Props {
  textContent: string
}

const PageTitle = ({ textContent }: Props): ReactElement => {
  return <h1 className="page-title-component">{textContent}</h1>
}

export default PageTitle
