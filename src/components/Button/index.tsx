import type { ButtonHTMLAttributes, ReactElement } from 'react'
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
}: Props): ReactElement => {
  const classes = clsx('button-component', className, {
    primary: variant == 'primary',
    secondary: variant == 'secondary',
    ghost: variant == 'ghost',
    disabled,
  })

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {label}
    </button>
  )
}

export default Button
