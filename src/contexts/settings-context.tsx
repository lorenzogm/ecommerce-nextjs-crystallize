import React, { useState, useContext } from 'react'
import dynamic from 'next/dynamic'

const mainNavigation = dynamic(
  () =>
    import(
      `themes/${process.env.NEXT_PUBLIC_THEME || 'crystallize'}/templates/MainNavigationTemplate/MainNavigationTemplate`
    ),
)

// A simple context for handling the current settings
export const SettingsContext = React.createContext({
  currency: 'EUR',
  mainNavigation,
})

export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ currency: cur, children }) => {
  const [currency, setCurrency] = useState(cur)

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, mainNavigation }}>{children}</SettingsContext.Provider>
  )
}
