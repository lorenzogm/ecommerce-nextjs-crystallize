import { ReactChild, ReactElement } from 'react'

type LinkExternalProps = {
  children: ReactChild
  href: string
  target?: string
  rel?: string
}

export default function LinkExternal({ children, href, target, rel }: LinkExternalProps): ReactElement {
  return (
    <a href={href} target={target} rel={rel}>
      {children}
    </a>
  )
}
