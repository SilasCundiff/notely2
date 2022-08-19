import { useState, useEffect } from "react"

import { getFirestore, collection, getDocs } from "firebase/firestore"

import Titlebar from "../components/Frame/Titlebar"

import { TOGGLE_INTERACTIVE } from "../../shared/constants"
import MenuDrawer from "../components/MenuDrawer/Drawer"
import { useMenuContext } from "../contexts/DrawerContext"
import WorkspaceStage from "../components/WorkspaceStage/WorkspaceStage"
import { app } from "../utils/firebase"
import Link from "next/link"

const db = getFirestore(app)

const colRef = collection(db, "test")

const IndexPage = () => {
  const [isNonInteractable, setIsNonInteractable] = useState(false) // should be interactive when loaded
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false)

  const { currentlySelectedWorkspace, workspaceList } = useMenuContext()

  const workspace = workspaceList?.filter(
    (workspace) =>
      workspace.workspaceId === currentlySelectedWorkspace && workspace
  )

  getDocs(colRef).then((snapshot) => {
    console.log(snapshot)
  })

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
          <div
            className={`basis-auto w-full p-2 ${
              !isNonInteractable && "bg-slate-900"
            }`}
          >
            <h1>Welcome</h1>
            <Link href="/workspaces">
              <a className="hover:text-sky-300 text-sky-200">To workspaces</a>
            </Link>
            <Link href="/workspaces">
              <a className="hover:text-sky-300 text-sky-200">Login</a>
            </Link>
            <Link href="/signup">
              <a className="hover:text-sky-300 text-sky-200">Signup</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
