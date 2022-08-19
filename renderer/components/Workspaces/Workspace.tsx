import WorkspaceContainer from "./WorkspaceContainer"

import Editor from "../Editors/Editor"
import { EditorData } from "../../interfaces"

function Workspace({ workspace }) {
  const { workspaceData } = workspace
  const { workspaceEditorList } = workspaceData
  console.log("workspace", workspaceData)

  const editors = workspaceEditorList?.map(
    ({ editorId, editorContent }: EditorData) => {
      console.log("editor map", editorId)

      return (
        <div key={editorId}>
          <Editor editorId={editorId} editorContent={editorContent} />
        </div>
      )
    }
  )

  return <WorkspaceContainer>{editors}</WorkspaceContainer>
}

export default Workspace
