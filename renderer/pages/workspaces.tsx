import MenuDrawer from "../components/MenuDrawer/Drawer"
import { useMenuContext } from "../contexts/DrawerContext"
import WorkspaceStage from "../components/WorkspaceStage/WorkspaceStage"
import { useAppInteractiveContext } from "../contexts/AppInteractiveContext"

const WorkspacesPage = () => {
  const { isNonInteractable } = useAppInteractiveContext()

  const { currentlySelectedWorkspace, workspaceList } = useMenuContext()

  const workspace = workspaceList?.filter(
    (workspace) =>
      workspace.workspaceId === currentlySelectedWorkspace && workspace
  )

  return (
    <>
      <div id="main" className="h-full w-full flex">
        {!isNonInteractable && <MenuDrawer />}
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
