import React, { useState } from "react"

import { useAuth } from "../contexts/AuthContext"

const Signup = () => {
  const { user, signup } = useAuth()

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const handleSignup = async (e: any) => {
    e.preventDefault()

    try {
      await signup(data.email, data.password)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1 className="text-center my-3 ">Signup</h1>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            className="text-sky-900"
            type="email"
            placeholder="Enter email"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            className="text-sky-900"
            type="password"
            placeholder="Password"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
          />
        </div>

        <button type="submit">Signup</button>
      </form>
    </>
  )
}

export default Signup
