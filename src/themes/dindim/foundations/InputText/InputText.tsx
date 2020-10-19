import { useFormContext } from 'react-hook-form'

import { useT } from 'lib/i18n'
import Label from 'themes/dindim/foundations/Label/Label'

import { Input, InputWrapper } from './InputText.styles'

type InputTextProps = {
  type?: 'text' | 'email'
  name: string
  label: string
  required?: boolean
  validate?: Record<string, (value: string) => boolean | string>
  disabled?: boolean
  placeholder?: string
}

export default function InputText({
  type = 'text',
  name,
  label,
  required = false,
  validate,
  disabled,
  placeholder,
}: InputTextProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, errors } = useFormContext()
  const t = useT()

  return (
    <InputWrapper>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        ref={register({
          required: required ? t('Required') : undefined,
          validate,
        })}
        disabled={disabled}
        placeholder={placeholder}
      />
      <p>{errors && errors[name] ? errors[name].message : ''}</p>
    </InputWrapper>
  )
}
