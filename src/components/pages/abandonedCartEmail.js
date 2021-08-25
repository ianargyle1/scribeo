import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import EmailNoSummary from "../privateComponents/Pages/emailNoSummary"

const AbandonedCartEmail = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={EmailNoSummary} pageName="Abandoned Cart Email" type="abandonedcart" />
  );
}

export default AbandonedCartEmail