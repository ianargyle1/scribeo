import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import AdCopy from "../privateComponents/Pages/adCopy"

const BABCopy = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={AdCopy} pageName="BAB Ad Copy" type="bab" sections={['Before', 'After', 'Bridge']} />
  );
}

export default BABCopy