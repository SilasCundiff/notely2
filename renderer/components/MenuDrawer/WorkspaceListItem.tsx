import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, useState } from "react"
import { useMenuContext } from "../../contexts/DrawerContext"

import {
  SET_WORKSPACE_ITEM_EDITABLE,
  DELETE_WORKSPACE_ITEM,
  UPDATE_WORKSPACE_ITEM,
  SELECTED_WORKSPACE,
} from "./MenuDrawerShared/DrawerConstants"
import { Workspace } from "../../interfaces"

function WorkspaceListItem({
  workspaceId,
  workspaceTitle,
  workspaceListItemMode,
  workspaceData,
}: Workspace) {
  const [workspaceItemInputValue, setWorkspaceItemInputValue] = useState(
    workspaceTitle !== undefined && workspaceTitle[0]
  )
  const [workspaceItemIsFocused, setWorkspaceItemIsFocused] = useState(false)
  const [workspaceItemIsHovered, setWorkspaceItemIsHovered] = useState(false)

  const { handleMenuAction, currentlySelectedWorkspace } = useMenuContext()

  const handleInputFocus = () => {
    handleMenuAction(SELECTED_WORKSPACE, {
      workspaceId: workspaceId,
    })
    setWorkspaceItemIsFocused(true)
  }
  const handleInputBlur = () => {
    setWorkspaceItemIsFocused(false)
    handleTitleUpdate()
  }

  const handleMouseEnter = () => setWorkspaceItemIsHovered(true)
  const handleMouseLeave = () => setWorkspaceItemIsHovered(false)

  const handleInputUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue !== workspaceItemInputValue) {
      setWorkspaceItemInputValue(e.target.value)
    }
  }

  const handleTitleUpdate = () => {
    const newTitleArray = [workspaceItemInputValue]

    handleMenuAction(UPDATE_WORKSPACE_ITEM, {
      workspaceId: workspaceId,
      workspaceTitle: newTitleArray,
      workspaceData,
    })
  }

  const handleClick = () => {
    handleMenuAction(SELECTED_WORKSPACE, {
      workspaceId: workspaceId,
    })
  }

  return (
    <div
      key={workspaceId}
      className={`flex rounded group focus-within:bg-sky-700 focus:bg-sky-700 hover:bg-sky-700 group-hover:bg-sky-700 relative ${
        workspaceId === currentlySelectedWorkspace && "bg-sky-700"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <input
        className="bg-transparent cursor-pointer appearance-none border-2 border-sky-200 rounded w-full py-2 px-4 text-sky-100 leading-tight focus:outline-none"
        type="text"
        value={workspaceItemInputValue}
        readOnly={!workspaceListItemMode}
        onChange={(e) => handleInputUpdate(e)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {(workspaceItemIsHovered || workspaceItemIsFocused) && (
        <div className="absolute top-1/2 -translate-y-1/2 right-0 flex bg-transparent ">
          {workspaceListItemMode ? (
            <button
              className="button text-sm my-auto mx-0.5 rounded-full flex justify-center items-center w-8 h-8 min-h-8 min-w-8  bg-green-500 focus:outline-none focus:bg-green-600 hover:bg-green-600"
              onClick={() => handleTitleUpdate()}
            >
              <FontAwesomeIcon className="icon" icon={faCheck} />
            </button>
          ) : (
            <>
              <button
                className="button text-sm my-auto mx-0.5 rounded-full flex justify-center items-center w-8 h-8 min-h-8 min-w-8  bg-cyan-500 focus:outline-none focus:bg-cyan-600 hover:bg-cyan-600"
                onClick={() => {
                  handleMenuAction(SET_WORKSPACE_ITEM_EDITABLE, {
                    workspaceId: workspaceId,
                  })
                }}
              >
                <FontAwesomeIcon className="icon" icon={faPencil} />
              </button>
              <button
                className="button text-sm my-auto mx-0.5 rounded-full flex justify-center items-center w-8 h-8 min-h-8 min-w-8  bg-red-500 focus:outline-none focus:bg-red-600 hover:bg-red-600"
                onClick={() =>
                  handleMenuAction(DELETE_WORKSPACE_ITEM, {
                    workspaceId: workspaceId,
                  })
                }
              >
                <FontAwesomeIcon className="icon" icon={faTrash} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default WorkspaceListItem
