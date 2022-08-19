import { EditorList } from "./Editors"

export type WorkspaceSchema = {
  workspaceId: number
  workspaceTitle?: string[] // Using a string array for potential future support of title history
  workspaceData?: {
    workspaceEditorList: EditorList
  }
}

export type WorkspaceListItem = {
  workspaceListItemMode?: boolean
  workspaceItemCurrentlySelected?: boolean
}

export type Workspace = WorkspaceSchema & WorkspaceListItem
