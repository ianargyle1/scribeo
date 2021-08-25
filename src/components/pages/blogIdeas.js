import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import BlogIdeas from "../privateComponents/Pages/blogIdeas"

const blogIdeas = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={BlogIdeas} pageName="Blog Ideas" />
  );
}

export default blogIdeas