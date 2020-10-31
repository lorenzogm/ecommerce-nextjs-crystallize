import { MouseEvent } from 'react'
import { ButtonDefault, ButtonPrimary } from './Button.styles'

type ButtonProps = {
  type?: 'button' | 'submit'
  variant?: 'primary'
  children: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ type = 'button', variant, children, onClick }: ButtonProps) {
  const Component = variant === 'primary' ? ButtonPrimary : ButtonDefault

  return (
    <Component type={type} onClick={onClick}>
      {children}
    </Component>
  )
}
