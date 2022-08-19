import React from "react"
import { useMenuContext } from "../../contexts/DrawerContext"
import MenuAddEditorInput from "./NewWorkspaceInput"

import MenuEditorList from "./WorkspaceList"

function MenuDrawer() {
  const {isMenuDrawerOpen} = useMenuContext()
  return (
    <div
      className={`w-full basis-80 bg-sky-800 transition-all flex flex-col ${
        isMenuDrawerOpen ? "max-w-md" : "max-w-0"
      }`}
    >
      <div className="p-2">
        <MenuEditorList />
      </div>

      <MenuAddEditorInput />
    </div>
  )
}

export default MenuDrawer
