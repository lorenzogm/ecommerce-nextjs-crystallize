import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from 'contexts/auth-context'
import navigation from 'themes/crystallize/config/navigation'
import Link from 'themes/crystallize/components/link'
import { useT } from 'lib/i18n'

import BurgerButton from './burger-button'
import BasketButton from './basket-button'
import LocaleSwitcher from './locale-switcher'
import { Outer, Nav, Logo, NavActions, NavList, NavListItem, PreviewBar } from './styles'

export default function Header({ simple, preview }) {
  const t = useT()
  const auth = useAuth()
  const router = useRouter()

  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      {preview && (
        <PreviewBar>
          You are in preview mode (<a href={`/api/preview?leave=${encodeURIComponent(router.asPath)}`}>leave</a>)
        </PreviewBar>
      )}
      <Outer simple={simple}>
        <Link href="/">
          <a>
            <Logo>
              <img src="/static/shop-logo.svg" alt="" />
            </Logo>
          </a>
        </Link>
        <Nav open={navOpen}>
          <NavList>
            {navigation.map((category) => (
              <NavListItem key={category.path}>
                <Link as={category.path} href="/[...catalogue]">
                  <a onClick={() => setNavOpen(false)}>{category.name}</a>
                </Link>
              </NavListItem>
            ))}
          </NavList>
        </Nav>
        <NavActions open={navOpen}>
          <LocaleSwitcher />
          {process.env.NEXT_PUBLIC_ENABLE_LOGIN === 'true' ? (
            <>
              {auth.isLoggedIn ? (
                <button type="button" onClick={auth.logout}>
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <a>{t('customer.login.title')}</a>
                </Link>
              )}
            </>
          ) : null}
        </NavActions>
        {!simple && <BasketButton />}
        <BurgerButton active={navOpen} onClick={() => setNavOpen(!navOpen)} />
      </Outer>
    </>
  )
}
