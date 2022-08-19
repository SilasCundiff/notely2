import React, { useEffect, useState } from "react"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { AuthContextProvider } from "../contexts/AuthContext"
import { MenuProvider } from "../contexts/DrawerContext"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import "../styles/global.css"
import { TOGGLE_INTERACTIVE } from "../../shared/constants"
import Titlebar from "../components/Frame/Titlebar"

const noAuthRequired = ["/", "/login", "/signup"]

function MyApp({ Component, pageProps }: AppProps) {
  const [isNonInteractable, setIsNonInteractable] = useState(false) // should be interactive when loaded
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleInteractivity = (_event, args) => setIsNonInteractable(args)

    // add a listener to 'message' channel
    global.ipcRenderer.addListener(TOGGLE_INTERACTIVE, handleInteractivity)

    return () => {
      global.ipcRenderer.removeListener(TOGGLE_INTERACTIVE, handleInteractivity)
    }
  }, [])

  return (
    <AuthContextProvider>
      <MenuProvider>
        <div className={`p-0 m-0 ${isMaximized ? "maximized" : "no"}`}>
          {!isNonInteractable && (
            <Titlebar
              setIsMaximized={setIsMaximized}
              setIsNonInteractable={setIsNonInteractable}
              isMenuDrawerOpen={isMenuDrawerOpen}
              setIsMenuDrawerOpen={setIsMenuDrawerOpen}
            />
          )}
          <div
            className={`${
              !isNonInteractable && "addBorder addBg"
            }  flex text-2xl h-screen w-full p-0 m-0`}
          >
            <div id="main" className="h-full w-full flex">
              <div
                className={`basis-auto w-full p-2 ${
                  !isNonInteractable && "bg-slate-900"
                }`}
              >
                {noAuthRequired.includes(router.pathname) ? (
                  <Component {...pageProps} />
                ) : (
                  <ProtectedRoute>
                    <Component {...pageProps} />
                  </ProtectedRoute>
                )}
              </div>
            </div>
          </div>
        </div>
      </MenuProvider>
    </AuthContextProvider>
  )
}

export default MyApp
