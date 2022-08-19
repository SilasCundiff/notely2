import { useState } from "react"

import MenuDrawer from "../components/MenuDrawer/Drawer"
import { useMenuContext } from "../contexts/DrawerContext"
import WorkspaceStage from "../components/WorkspaceStage/WorkspaceStage"

const WorkspacesPage = () => {
  const [isNonInteractable, setIsNonInteractable] = useState(false) // should be interactive when loaded
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false)

  const { currentlySelectedWorkspace, workspaceList } = useMenuContext()

  const workspace = workspaceList?.filter(
    (workspace) =>
      workspace.workspaceId === currentlySelectedWorkspace && workspace
  )

  return (
    <>
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
    </>
  )
}

export default WorkspacesPage
