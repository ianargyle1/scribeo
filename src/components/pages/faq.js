import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import FAQ from "../privateComponents/Pages/faq"

const faq = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={FAQ} pageName="Frequently Asked Questions" />
  );
}

export default faq