import { useState, createContext, useContext, useEffect } from "react"
import { AppInteractiveContextInterface } from "../interfaces"
import { TOGGLE_INTERACTIVE } from "../../shared/constants"

const AppInteractiveContext =
  createContext<AppInteractiveContextInterface | null>(null)

export function AppInteractiveProvider({ children }) {
  const [isNonInteractable, setIsNonInteractable] = useState(false) // should be interactive when loaded
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    const handleInteractivity = (_event, args) => setIsNonInteractable(args)

    global.ipcRenderer.addListener(TOGGLE_INTERACTIVE, handleInteractivity)

    return () => {
      global.ipcRenderer.removeListener(TOGGLE_INTERACTIVE, handleInteractivity)
    }
  }, [])

  return (
    <AppInteractiveContext.Provider
      value={{
        isNonInteractable,
        setIsNonInteractable,
        isMaximized,
        setIsMaximized,
      }}
    >
      {children}
    </AppInteractiveContext.Provider>
  )
}

export const useAppInteractiveContext = () => {
  return useContext(AppInteractiveContext)
}
