import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { useMenuContext } from "../../contexts/DrawerContext"
import { v4 as uuidv4 } from "uuid" // temp solution

import {
  TITLE_IMPORT_SIZE_LIMIT,
  ADD_WORKSPACE_ITEM,
} from "./MenuDrawerShared/DrawerConstants"

function MenuAddWorkspaceInput() {
  const [inputValue, setInputValue] = useState("")

  const { handleMenuAction } = useMenuContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue.length <= 0) {
      return
    }

    handleMenuAction(ADD_WORKSPACE_ITEM, {
      workspaceId: uuidv4(),
      workspaceTitle: [inputValue],
    })

    setInputValue("") // reset input
  }

  const handleChange = (e) => {
    if (e.target.value.length <= TITLE_IMPORT_SIZE_LIMIT) {
      setInputValue(e.target.value)
    }
  }

  return (
    <form className=" p-1 gap-1 mt-auto flex" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="bg-sky-900 appearance-none border-2 border-sky-200 rounded w-full py-2 px-4 text-sky-100 leading-tight focus:outline-none focus:bg-sky-700 focus:border-sky-500"
        type="text"
        onChange={(e) => handleChange(e)}
        value={inputValue}
        placeholder="Workspace Title"
      />
      <button
        type="submit"
        className="shadow bg-sky-500 hover:bg-sky-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      >
        <FontAwesomeIcon className="icon" icon={faPlus} />
      </button>
    </form>
  )
}

export default MenuAddWorkspaceInput
