import React, { useState, useContext } from 'react'

const mainNavigation = [
  {
    type: 'folder',
    name: 'Mujer y Hombre',
    path: '/mujer-y-hombre',
  },
  {
    type: 'folder',
    name: 'Peques',
    path: '/peques',
  },
  {
    type: 'folder',
    name: 'Bebés',
    path: '/bebes',
  },
]

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
