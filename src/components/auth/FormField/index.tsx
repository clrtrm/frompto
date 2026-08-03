import type { InputHTMLAttributes } from 'react'

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
  <li>
    <label htmlFor={id}>
      {label}
      {required && '*'}
    </label>
    <input
      autoComplete={autoComplete}
      id={id}
      name={id}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
      {...rest}
    />
  </li>
)

export default FormField
