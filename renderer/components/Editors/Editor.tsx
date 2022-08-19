import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { EditorData } from "../../interfaces"

const Editor = ({ editorId, editorContent }: EditorData) => {
  console.log("inside editor: ", editorId, editorContent)

  const editor = useEditor({
    extensions: [StarterKit],
    content: editorContent,
  })

  return <EditorContent editor={editor} />
}

export default Editor
