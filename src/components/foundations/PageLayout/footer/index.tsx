import React from 'react'

import Link from 'components/crystallize/components/link'
import { useT } from 'lib/i18n'
import navigation from 'config/navigation'
import LogoWithName from 'components/foundations/LogoWithName/LogoWithName'

import { Outer, NavList } from './styles'

export default function Footer() {
  const t = useT()

  return (
    <Outer>
      <Link href="/">
        <a>
          <LogoWithName />
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
    </Outer>
  )
}
