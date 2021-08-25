import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import SalesEmail from "../privateComponents/Pages/salesEmail"

const SalesEmailPage = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={SalesEmail} pageName="Sales Email" />
  );
}

export default SalesEmailPage