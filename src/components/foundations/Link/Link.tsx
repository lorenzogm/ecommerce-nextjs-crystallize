import LinkNext from 'next/link'
import { ReactNode } from 'react'

type LinkProps = {
  children: ReactNode
  href: string
  as?: string
  passHref?: boolean
}

export default function Link({ children, href, as, passHref }: LinkProps) {
  return (
    <LinkNext href={href} as={`/${as || href}`.replace(/\/{2,}/g, '/')} passHref={passHref}>
      {children}
    </LinkNext>
  )
}
