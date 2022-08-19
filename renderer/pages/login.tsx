import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { TOGGLE_INTERACTIVE } from "../../shared/constants"
import Titlebar from "../components/Frame/Titlebar"
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const router = useRouter()
  const { user, login } = useAuth()
  const [isNonInteractable, setIsNonInteractable] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(data.email, data.password)
      router.push("/workspaces")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const handleInteractivity = (_event, args) => setIsNonInteractable(args)

    // add a listener to 'message' channel
    global.ipcRenderer.addListener(TOGGLE_INTERACTIVE, handleInteractivity)

    return () => {
      global.ipcRenderer.removeListener(TOGGLE_INTERACTIVE, handleInteractivity)
    }
  }, [])

  return (
    <div className={`p-0 m-0 ${isMaximized ? "maximized" : "no"}`}>
      {!isNonInteractable && (
        <Titlebar
          setIsMaximized={setIsMaximized}
          setIsNonInteractable={setIsNonInteractable}
          isMenuDrawerOpen={isMenuDrawerOpen}
          setIsMenuDrawerOpen={setIsMenuDrawerOpen}
        />
      )}
      <div
        className={`${
          !isNonInteractable && "addBorder addBg"
        }  flex text-2xl h-screen w-full p-0 m-0`}
      >
        <div id="main" className="h-full w-full flex">
          <div
            className={`basis-auto w-full p-2 ${
              !isNonInteractable && "bg-slate-900"
            }`}
          >
            <h1 className="text-center my-3 ">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  className="text-sky-900"
                  onChange={(e) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                  value={data.email}
                  required
                  type="email"
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  className="text-sky-900"
                  onChange={(e: any) =>
                    setData({
                      ...data,
                      password: e.target.value,
                    })
                  }
                  value={data.password}
                  required
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
