import { useState, useEffect } from "react"

import Editor from "../components/Editor"
import Titlebar from "../components/TitleBar"

import { TOGGLE_INTERACTIVE } from "../../shared/constants"
import MenuDrawer from "../components/MenuDrawer"

const IndexPage = () => {
  const [isNonInteractable, setIsNonInteractable] = useState(false) // should be interactive when loaded
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false)

  useEffect(() => {
    const handleInteractivity = (_event, args) => setIsNonInteractable(args)

    // add a listener to 'message' channel
    global.ipcRenderer.addListener(TOGGLE_INTERACTIVE, handleInteractivity)

    return () => {
      global.ipcRenderer.removeListener(TOGGLE_INTERACTIVE, handleInteractivity)
    }
  }, [])
  return (
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
          <MenuDrawer isMenuDrawerOpen={isMenuDrawerOpen} />
          <div className="basis-auto bg-slate-900 w-full p-2">
            <Editor />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
