import React, { useEffect, useState } from "react"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { AuthContextProvider } from "../contexts/AuthContext"
import { MenuProvider } from "../contexts/DrawerContext"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import "../styles/global.css"

import { AppInteractiveProvider } from "../contexts/AppInteractiveContext"
import Layout from "../components/Layout"

const noAuthRequired = ["/", "/login", "/signup"]

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <AuthContextProvider>
      <AppInteractiveProvider>
        <MenuProvider>
          <Layout>
            {noAuthRequired.includes(router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            )}
          </Layout>
        </MenuProvider>
      </AppInteractiveProvider>
    </AuthContextProvider>
  )
}

export default MyApp
