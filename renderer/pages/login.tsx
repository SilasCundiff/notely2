import { useRouter } from "next/router"
import React, { useState } from "react"

import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const router = useRouter()
  const { user, login } = useAuth()
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

  return (
    <>
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
    </>
  )
}

export default Login
