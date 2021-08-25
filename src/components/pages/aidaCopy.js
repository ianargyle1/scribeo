import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import AdCopy from "../privateComponents/Pages/adCopy"

const AIDACopy = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={AdCopy} pageName="AIDA Ad Copy" type="aida" sections={['Attention', 'Interest', 'Desire', 'Action']} />
  );
}

export default AIDACopy