import { getFirestore, collection, getDocs } from "firebase/firestore"

import { useMenuContext } from "../contexts/DrawerContext"
import WorkspaceStage from "../components/WorkspaceStage/WorkspaceStage"
import { app } from "../utils/firebase"
import Link from "next/link"

const db = getFirestore(app)

const colRef = collection(db, "test")

const IndexPage = () => {
  const { currentlySelectedWorkspace, workspaceList } = useMenuContext()

  const workspace = workspaceList?.filter(
    (workspace) =>
      workspace.workspaceId === currentlySelectedWorkspace && workspace
  )

  getDocs(colRef).then((snapshot) => {
    console.log(snapshot)
  })

  return (
    <>
      <h1>Welcome</h1>
      <Link href="/workspaces">
        <a className="hover:text-sky-300 text-sky-200">To workspaces</a>
      </Link>
      <Link href="/workspaces">
        <a className="hover:text-sky-300 text-sky-200">Login</a>
      </Link>
      <Link href="/signup">
        <a className="hover:text-sky-300 text-sky-200">Signup</a>
      </Link>
    </>
  )
}

export default IndexPage
