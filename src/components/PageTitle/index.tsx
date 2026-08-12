import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { ReactElement } from 'react'

import './styles.scss'

interface Props {
  documentTitle?: string
  textContent: string
}

const PageTitle = ({ documentTitle, textContent }: Props): ReactElement => {
  useDocumentTitle(documentTitle || textContent)

  return <h1 className="page-title-component">{textContent}</h1>
}

export default PageTitle
