import type { InputHTMLAttributes } from 'react'

import './styles.scss'

interface Props extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  autoComplete?: string
  id: string
  label: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  value: string
}

const FormField = ({
  autoComplete,
  id,
  label,
  onChange,
  placeholder,
  required,
  type = 'text',
  value,
  ...rest
}: Props) => (
  <li className="form-field-component">
    <label className="form-field-component__label" htmlFor={id}>
      {label}
      {required && '*'}
    </label>
    <input
      autoComplete={autoComplete}
      className="form-field-component__input"
      id={id}
      name={id}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
      {...rest}
    />
  </li>
)

export default FormField
