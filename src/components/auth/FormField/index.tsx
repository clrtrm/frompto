interface Props {
  autoComplete?: string
  id: string
  label: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  value: string
}

const FormField = ({
  autoComplete,
  id,
  label,
  onChange,
  placeholder,
  type = 'text',
  value,
}: Props) => (
  <li>
    <label htmlFor={id}>{label}</label>
    <input
      autoComplete={autoComplete}
      id={id}
      name={id}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  </li>
)

export default FormField
