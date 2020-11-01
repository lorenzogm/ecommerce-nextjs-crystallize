import { AppProps } from 'next/dist/next-server/lib/router/router'

import MetaTags from 'components/elements/MetaTags/MetaTags'
import { AuthProvider } from 'contexts/auth-context'
import { SettingsProvider } from 'contexts/settings-context'
import { BasketProvider } from 'contexts/BasketContext/BasketContext'
import { getLocaleFromContext } from 'lib/app-config'
import { I18nextProvider } from 'lib/i18n'

import localeResourceEs from 'locales/es.json'
import { useGtagHandlerouteChange } from 'services/gtag'
import 'styles/tailwind.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  useGtagHandlerouteChange()
  const locale = getLocaleFromContext()

  return (
    <>
      <MetaTags />
      <I18nextProvider locale={locale} localeResource={localeResourceEs}>
        <SettingsProvider currency={locale?.defaultCurrency}>
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
