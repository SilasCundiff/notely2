import React from "react"
import { useAppInteractiveContext } from "../contexts/AppInteractiveContext"
import Titlebar from "./Frame/Titlebar"

function Layout({ children }) {
  const { isMaximized, isNonInteractable } = useAppInteractiveContext()
  return (
    <div className={`p-0 m-0 ${isMaximized ? "maximized" : "no"}`}>
      {!isNonInteractable && <Titlebar />}
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
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
