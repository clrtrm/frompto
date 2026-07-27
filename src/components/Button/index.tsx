import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

import './styles.scss'

type Variant = 'primary' | 'secondary' | 'ghost'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant?: Variant
}

const Button = ({
  className,
  disabled,
  label,
  variant = 'primary',
  ...rest
}: Props): ReactNode => {
  const classes = clsx('button-component', className, {
    primary: variant == 'primary',
    secondary: variant == 'secondary',
    ghost: variant == 'ghost',
    disabled,
  })

  return (
    <button className={classes} {...rest}>
      {label}
    </button>
  )
}

export default Button
