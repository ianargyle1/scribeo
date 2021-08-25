import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import BlogComponent from "../privateComponents/Pages/blogComponent"

const GeneralBlog = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={BlogComponent} pageName="General Blog Post" type="info" />
  );
}

export default GeneralBlog