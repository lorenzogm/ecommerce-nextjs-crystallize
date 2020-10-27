import React, { useState, useContext } from 'react'

// A simple context for handling the current settings
export const SettingsContext = React.createContext({
  currency: 'EUR',
})

export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ currency: cur, children }) => {
  const [currency, setCurrency] = useState(cur)

  return <SettingsContext.Provider value={{ currency, setCurrency }}>{children}</SettingsContext.Provider>
}
