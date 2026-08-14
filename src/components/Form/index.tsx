import clsx from 'clsx'

import type { FormHTMLAttributes, PropsWithChildren, ReactElement } from 'react'

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

  return (
    <form className={classes} {...rest}>
      {errors.length > 0 ? (
        <ul className="form-component__errors">
          <p className="form-component__errors__title">Uh-oh!</p>
          {errors.map((el, idx) => (
            <li key={idx}>{el}</li>
          ))}
        </ul>
      ) : null}
      <ul className="form-component__inputs">{children}</ul>
    </form>
  )
}

export default Form
