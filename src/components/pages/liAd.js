import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import FBLIAd from "../privateComponents/Pages/fbliAd"

const LIAd = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={FBLIAd} pageName="LinkedIn Ad" type="li" />
  );
}

export default LIAd