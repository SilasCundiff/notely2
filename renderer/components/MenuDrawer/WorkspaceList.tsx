import React from "react"
import { useMenuContext } from "../../contexts/DrawerContext"
import { Workspace } from "../../interfaces"
import WorkspaceListItem from "./WorkspaceListItem"

function WorkspaceList() {
  const { workspaceList } = useMenuContext()

  return (
    <>
      {workspaceList?.map((workspace: Workspace) => (
        <WorkspaceListItem {...workspace} />
      ))}
    </>
  )
}

export default WorkspaceList
