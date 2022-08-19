import { useState, createContext, useContext } from "react"

import type {
  Workspace,
  HandleMenuAction,
  MenuContextInterface,
} from "../interfaces"

import {
  ADD_WORKSPACE_ITEM,
  UPDATE_WORKSPACE_ITEM,
  SET_WORKSPACE_ITEM_EDITABLE,
  DELETE_WORKSPACE_ITEM,
  SELECTED_WORKSPACE,
} from "../components/MenuDrawer/MenuDrawerShared/DrawerConstants"

import { initialExampleList } from "../components/MenuDrawer/MenuDrawerShared/sampleWorkspaceData"

const MenuContext = createContext<MenuContextInterface | null>(null)

const getWorkspaceFromList = (
  workspaceList: Workspace[],
  workspaceToGet: Workspace
) => {
  return workspaceList.findIndex(
    (workspace: Workspace) =>
      workspace.workspaceId === workspaceToGet.workspaceId
  )
}

export function MenuProvider({ children }) {
  const [workspaceList, setWorkspaceList] = useState(initialExampleList)
  const [currentlySelectedWorkspace, setCurrentlySelectedWorkspace] = useState(
    initialExampleList[0].workspaceId
  )

  const handleMenuAction: HandleMenuAction = (action, payload) => {
    // console.log(action, "payload", payload)
    const { workspaceId } = payload

    const newWorkspaceList = [...workspaceList]
    const workspace = getWorkspaceFromList(newWorkspaceList, payload)

    switch (action) {
      case ADD_WORKSPACE_ITEM:
        newWorkspaceList.push(payload)
        setWorkspaceList(newWorkspaceList)
        break
      case UPDATE_WORKSPACE_ITEM:
        newWorkspaceList[workspace] = {
          ...payload,
          workspaceListItemMode: false,
        }
        setWorkspaceList(newWorkspaceList)
        break
      case SET_WORKSPACE_ITEM_EDITABLE:
        newWorkspaceList[workspace] = {
          ...payload,
          workspaceListItemMode: true,
        }
        setWorkspaceList(newWorkspaceList)
        break
      case DELETE_WORKSPACE_ITEM:
        newWorkspaceList.splice(workspace, 1)
        setWorkspaceList(newWorkspaceList)
        break
      case SELECTED_WORKSPACE:
        if (currentlySelectedWorkspace !== workspaceId) {
          setCurrentlySelectedWorkspace(workspaceId)
        }
        break
      default:
        setWorkspaceList(newWorkspaceList)
        break
    }
  }

  return (
    <MenuContext.Provider
      value={{
        workspaceList,
        setWorkspaceList,
        handleMenuAction,
        currentlySelectedWorkspace,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export const useMenuContext = () => {
  return useContext(MenuContext)
}
