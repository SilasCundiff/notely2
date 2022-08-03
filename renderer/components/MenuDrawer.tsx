import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"

function MenuDrawer({ isMenuDrawerOpen }) {
  const [editorList, setEditorList] = useState([
    {
      editorId: 1,
      editorName: "test editor 1",
    },
    {
      editorId: 2,
      editorName: "test editor 2",
    },
    {
      editorId: 3,
      editorName: "test editor 3",
    },
  ])

  const editorMap = editorList.map((editor) => (
    <li key={editor.editorId}>{editor.editorName}</li>
  ))

  const handleClick = (
    action: string,
    payload: { editorId: number; editorName: string }
  ) => {
    const newEditorList = [...editorList]

    switch (action) {
      case "add":
        newEditorList.push(payload)
        setEditorList(newEditorList)
        break
      case "edit":
        const editorToEdit = newEditorList.findIndex(
          (editor) => editor.editorId === payload.editorId
        )
        newEditorList[editorToEdit] = payload
        setEditorList(newEditorList)
        break
      case "delete":
        const editorToDelete = newEditorList.findIndex(
          (editor) => editor.editorId === payload.editorId
        )
        newEditorList.splice(editorToDelete, 1)
        setEditorList(newEditorList)
        break
      default:
        setEditorList(newEditorList)
        break
    }
  }

  return (
    <div
      className={`w-full basis-80 bg-sky-800 transition-all flex flex-col ${
        isMenuDrawerOpen ? "max-w-xs" : "max-w-0"
      }`}
    >
      <div className="p-2">
        <ul>{editorMap}</ul>
      </div>
      <div className="bg-sky-900 mt-auto grid grid-cols-3">
        <div
          className="button flex justify-center align-middle py-3 bg-sky-900 hover:bg-sky-800"
          onClick={() =>
            handleClick("add", {
              editorId: Math.floor(Math.random() * 1000000),
              editorName: `test editor`,
            })
          }
        >
          <FontAwesomeIcon className="icon" icon={faPlus} />
        </div>
        <div
          className="button flex justify-center align-middle py-3 bg-sky-900 hover:bg-sky-800"
          onClick={() =>
            handleClick("edit", {
              editorId: 3,
              editorName: "test editor three",
            })
          }
        >
          <FontAwesomeIcon className="icon" icon={faPencil} />
        </div>
        <div
          className="button flex justify-center align-middle py-3 bg-sky-900 hover:bg-sky-800"
          onClick={() =>
            handleClick("delete", {
              editorId: 2,
              editorName: "test editor 2",
            })
          }
        >
          <FontAwesomeIcon className="icon" icon={faTrash} />
        </div>
      </div>
    </div>
  )
}

export default MenuDrawer
