import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import EmailNoSummary from "../privateComponents/Pages/emailNoSummary"

const CancellationEmail = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={EmailNoSummary} pageName="Cancellation Email" type="cancellation" />
  );
}

export default CancellationEmail