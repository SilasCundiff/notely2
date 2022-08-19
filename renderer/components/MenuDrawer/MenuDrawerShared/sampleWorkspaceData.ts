import { Workspace } from "../../../interfaces"

//! NOTES:
//? reserving editor and workspace id of 0 for potential future template to show when users workspace/editor list is empty

export const initialExampleList: Workspace[] = [
  {
    workspaceId: 1,
    workspaceTitle: ["test workspace 1"],
    workspaceListItemMode: false,
    workspaceData: {
      workspaceEditorList: [
        {
          editorId: 1,
          editorContent: `<ul>
            <h3>Included in starter kit:</h3>
      
            <h4>Nodes</h4>
            <li>Blockquote</li>
            <li>BulletList</li>
            <li>Code Block</li>
            <li>Document</li>
            <li>Hard Break</li>
            <li>Heading</li>
            <li>Horizontal Rule</li>
            <li>List Item</li>
            <li>Ordered List</li>
            <li>Paragraph</li>
            <li>Text</li>
            <hr />
      
            <h4>Marks</h4>
            <li>Bold</li>
            <li>Code</li>
            <li>Italic</li>
            <li>Strike</li>
      
            <h4>Extensions</h4>
            <li>Dropcursor</li>
            <li>Gapcursor</li>
            <li>History</li>
          </ul>`,
        },
        {
          editorId: 2,
          editorContent: `<div>here is a second editor</div>`,
        },
      ],
    },
  },
  {
    workspaceId: 2,
    workspaceTitle: ["test workspace 2"],
    workspaceListItemMode: false,
    workspaceData: {
      workspaceEditorList: [
        {
          editorId: 1,
          editorContent: `<div>here is a first editor</div>`,
        },
        {
          editorId: 2,
          editorContent: `<div>here is a second editor</div>`,
        },
        {
          editorId: 3,
          editorContent: `<div>here is a third editor</div>`,
        },
      ],
    },
  },
  {
    workspaceId: 3,
    workspaceTitle: ["test workspace 3"],
    workspaceListItemMode: false,
    workspaceData: {
      workspaceEditorList: [],
    },
  },
]
