import { useRouter } from 'next/router'

import appConfigRaw from '../../app.config.json'

// Validate locales
if (!appConfigRaw.locales) {
  throw new Error('app.config.js: locales is not defined')
}
if (appConfigRaw.locales.filter((l) => l.isDefault).length > 1) {
  throw new Error('app.config.js: cannot have more than one default locale')
}

const appConfig = {
  ...appConfigRaw,
  locales: appConfigRaw.locales.map((locale) => ({
    ...locale,
    urlPrefix: locale.urlPrefix.replace(/\//g, ''),
  })),
}

export const { locales } = appConfig

export const defaultLocale = appConfig.locales.find((l) => l.isDefault)

// Get the current locale
export function useLocale() {
  const router = useRouter()

  return getLocaleFromContext(router)
}

/**
 * Determine if it is a multilingual shop. Example:
 * /en/my-product
 * /de/mein-produkt
 */
export const isMultilingual = appConfig.locales.length > 1

export function getLocaleFromContext() {
  let localeCode = 'es'
  if (process.browser) {
    const [, localeCodeFromUrl] = window.location.pathname.split('/')
    localeCode = localeCodeFromUrl
  }

  return appConfig.locales.find((l) => l.urlPrefix === localeCode) || defaultLocale
}

export default appConfig
