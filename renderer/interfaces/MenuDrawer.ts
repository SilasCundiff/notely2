import { Dispatch, SetStateAction } from "react"

import { Workspace } from "./Workspace"

export type HandleMenuAction = (action: string, payload: Workspace) => void

export interface MenuContextInterface {
  workspaceList?: Array<Workspace>
  setWorkspaceList?: Dispatch<SetStateAction<Array<Workspace>>>
  handleMenuAction?: HandleMenuAction
  currentlySelectedWorkspace?: number
}
