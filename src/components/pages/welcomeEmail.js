import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import Email from "../privateComponents/Pages/email"

const WelcomeEmail = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={Email} pageName="Welcome Email" type="welcome" {...rest}  />
  );
}

export default WelcomeEmail