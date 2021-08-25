import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import SearchAd from "../privateComponents/Pages/searchAd"

const searchAd = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={SearchAd} pageName="Search Ad" />
  );
}

export default searchAd