import { Link } from 'react-router-dom'
import clsx from 'clsx'

import type { ReactElement } from 'react'
import type { LinkProps } from 'react-router-dom'

import './styles.scss'

const CustomLink = ({
  children,
  className,
  ...rest
}: LinkProps): ReactElement => {
  const classes = clsx('link-component', className)

  return (
    <Link {...rest} className={classes}>
      {children}
    </Link>
  )
}

export default CustomLink
