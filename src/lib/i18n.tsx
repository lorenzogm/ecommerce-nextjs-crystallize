import { createContext, useContext } from 'react'
import i18n from 'i18next'

const I18NextContext = createContext()

export const useT = () => {
  const c = useContext(I18NextContext)

  return (val, options) => {
    const result = c.t(val, options)
    if (result === '') {
      throw new Error(`Missing translation "${val}"`)
    }
    return result
  }
}

export function I18nextProvider({ locale, localeResource, children }) {
  const lng = locale.appLanguage

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale.defaultCurrency,
  })

  i18n.init({
    resources: {
      [lng]: { translation: localeResource },
    },
    lng,

    // allow keys to be phrases having `:`, `.`
    nsSeparator: false,
    keySeparator: false,

    // do not load a fallback
    // fallbackLng: true,

    interpolation: {
      escapeValue: false, // react already safe from xss
      format(value, format) {
        if (format === 'uppercase') {
          return value.toUpperCase()
        }

        if (format === 'currency') {
          return currencyFormatter.format(value)
        }

        return value
      },
    },
  })

  return <I18NextContext.Provider value={i18n}>{children}</I18NextContext.Provider>
}
