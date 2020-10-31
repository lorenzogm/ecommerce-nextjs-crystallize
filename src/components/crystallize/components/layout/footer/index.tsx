import React from 'react'

import Link from 'components/crystallize/components/link'
import LogoCrystallize from 'components/crystallize/ui/icons/logo-crystallize'
import { useT } from 'lib/i18n'
import navigation from 'config/navigation'

import { Outer, Logo, NavList, Powered } from './styles'

export default function Footer() {
  const t = useT()

  return (
    <Outer>
      <Link href="/">
        <a>
          <Logo>
            <img src="/static/shop-logo.svg" alt="" />
          </Logo>
        </a>
      </Link>
      <NavList>
        <h5>{t('Menu')}</h5>
        {navigation.map((category) => (
          <li key={category.path}>
            <Link as={category.path} href="/[...catalogue]">
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </NavList>
      <Powered>
        <p>{t('eCommerce by')}</p>
        <a href="https://crystallize.com" aria-label="crystallize.com">
          <LogoCrystallize size={10} />
        </a>
      </Powered>
    </Outer>
  )
}
