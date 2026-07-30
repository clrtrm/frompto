import type { FormHTMLAttributes, PropsWithChildren, ReactElement } from 'react'
import clsx from 'clsx'

import './styles.scss'

interface Props extends FormHTMLAttributes<HTMLFormElement>, PropsWithChildren {
  errors: string[]
}

const Form = ({
  errors,
  children,
  className,
  ...rest
}: Props): ReactElement => {
  const classes = clsx('form-component', className)

  console.log(errors)

  return (
    <form className={classes} {...rest}>
      {errors.length > 0 ? (
        <ul className="form-component__errors">
          <p className="form-component__errors__title">
            Uh-oh! Some errors arose:
          </p>
          {errors.map((el) => (
            <li>{el}</li>
          ))}
        </ul>
      ) : null}
      <ul className="form-component__inputs">{children}</ul>
    </form>
  )
}

export default Form
