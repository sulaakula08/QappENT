import { createContext, useContext } from 'react'

export const ENTTabContext = createContext({
  activeTab: 'score',
  setActiveTab: () => {},
})

export function useENTTab() {
  return useContext(ENTTabContext)
}
