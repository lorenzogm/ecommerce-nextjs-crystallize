import { AppProps } from 'next/dist/next-server/lib/router/router'

import MetaTags from 'components/elements/MetaTags/MetaTags'
import { AuthProvider } from 'contexts/auth-context'
import { SettingsProvider } from 'contexts/settings-context'
import { BasketProvider } from 'contexts/BasketContext/BasketContext'
import { getLocaleFromContext } from 'lib/app-config'
import { I18nextProvider } from 'lib/i18n'

import localeResourceEn from 'locales/en-US'
import localeResourceEs from 'locales/es-ES'

export default function MyApp({ Component, pageProps }: AppProps) {
  const locale = getLocaleFromContext()

  return (
    <>
      <MetaTags />
      <I18nextProvider
        locale={locale}
        localeResource={locale?.displayName === 'en' ? localeResourceEn : localeResourceEs}
      >
        <SettingsProvider currency={locale?.defaultCurrency} mainNavigation={locale?.mainNavigation}>
          <AuthProvider>
            <BasketProvider>
              <Component {...pageProps} />
            </BasketProvider>
          </AuthProvider>
        </SettingsProvider>
      </I18nextProvider>
    </>
  )
}
