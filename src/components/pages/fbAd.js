import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import FBLIAd from "../privateComponents/Pages/fbliAd"

const FBAd = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={FBLIAd} pageName="Facebook Ad" type="fb" />
  );
}

export default FBAd