import clsx from 'clsx'

import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { ReactElement } from 'react'

import './styles.scss'

interface Props {
  className?: string
  documentTitle?: string
  textContent: string
}

const PageTitle = ({
  className,
  documentTitle,
  textContent,
}: Props): ReactElement => {
  useDocumentTitle(documentTitle || textContent)
  const classes = clsx('page-title-component', className)

  return <h1 className={classes}>{textContent}</h1>
}

export default PageTitle
