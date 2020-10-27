import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from 'contexts/auth-context'
import Link from 'themes/crystallize/components/link'
import { useT } from 'lib/i18n'
import { isMultilingual } from 'lib/app-config'
import Navigation from 'themes/dindim/elements/Navigation/Navigation'
import LogoWithName from 'themes/dindim/foundations/LogoWithName/LogoWithName'

import BurgerButton from './burger-button'
import BasketButton from './basket-button'
import LocaleSwitcher from './locale-switcher'
import { Outer, NavActions, PreviewBar } from './styles'

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
            <LogoWithName />
          </a>
        </Link>
        <Navigation navOpen={navOpen} setNavOpen={setNavOpen} />
        <NavActions open={navOpen}>
          {isMultilingual ? <LocaleSwitcher /> : null}
          {process.env.NEXT_PUBLIC_ENABLE_LOGIN === 'true' ? (
            <>
              {auth.isLoggedIn ? (
                <button type="button" onClick={auth.logout}>
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <a>{t('Login')}</a>
                </Link>
              )}
            </>
          ) : null}
        </NavActions>
        {process.env.NEXT_PUBLIC_ENABLE_CHECKOUT === 'true' && !simple ? <BasketButton /> : null}
        <BurgerButton active={navOpen} onClick={() => setNavOpen(!navOpen)} />
      </Outer>
    </>
  )
}
