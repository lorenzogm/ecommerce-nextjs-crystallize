import React from 'react'

import Link from 'themes/crystallize/components/link'
import LogoCrystallize from 'themes/crystallize/ui/icons/logo-crystallize'
import { useT } from 'lib/i18n'
import navigation from 'themes/dindim/config/navigation'

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
        <h5>{t('layout.menu')}</h5>
        {navigation.map((category) => (
          <li key={category.path}>
            <Link as={category.path} href="/[...catalogue]">
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </NavList>
      <Powered>
        <p>{t('layout.ecomBy')}</p>
        <a href="https://crystallize.com" aria-label="crystallize.com">
          <LogoCrystallize size={10} />
        </a>
      </Powered>
    </Outer>
  )
}
