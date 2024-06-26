import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../utils/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn && location.pathname !== `/login`) {
    navigate("/login")
    return null
  }

  return <Component location={location} {...rest} />
}

export default PrivateRoute