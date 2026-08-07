import { Link } from 'react-router-dom'

import type { ReactElement } from 'react'
import type { LinkProps } from 'react-router-dom'

import './styles.scss'

const CustomLink = ({ children, ...rest }: LinkProps): ReactElement => {
  return (
    <Link {...rest} className="link-component">
      {children}
    </Link>
  )
}

export default CustomLink
