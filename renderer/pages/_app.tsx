import React from "react"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { AuthContextProvider } from "../contexts/AuthContext"
import { MenuProvider } from "../contexts/DrawerContext"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import "../styles/global.css"

const noAuthRequired = ["/", "/login", "/signup"]

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <AuthContextProvider>
      <MenuProvider>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </MenuProvider>
    </AuthContextProvider>
  )
}

export default MyApp
