import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import AdCopy from "../privateComponents/Pages/adCopy"

const PASCopy = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={AdCopy} pageName="PAS Ad Copy" type="pas" sections={['Pain', 'Agitate', 'Solution']} />
  );
}

export default PASCopy