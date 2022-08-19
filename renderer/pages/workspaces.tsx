import { useState, useEffect } from "react"

import { getFirestore, collection, getDocs } from "firebase/firestore"

import Titlebar from "../components/Frame/Titlebar"

import { TOGGLE_INTERACTIVE } from "../../shared/constants"
import MenuDrawer from "../components/MenuDrawer/Drawer"
import { useMenuContext } from "../contexts/DrawerContext"
import WorkspaceStage from "../components/WorkspaceStage/WorkspaceStage"
import { app } from "../utils/firebase"

const db = getFirestore(app)

const colRef = collection(db, "test")

const WorkspacesPage = () => {
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
          {!isNonInteractable && (
            <MenuDrawer isMenuDrawerOpen={isMenuDrawerOpen} />
          )}
          <div
            className={`basis-auto w-full p-2 ${
              !isNonInteractable && "bg-slate-900"
            }`}
          >
            {workspace && <WorkspaceStage workspace={workspace[0]} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspacesPage
