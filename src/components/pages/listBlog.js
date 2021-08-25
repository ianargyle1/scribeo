import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import ListBlogComponent from "../privateComponents/Pages/listBlogComponent"

const ListBlog = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={ListBlogComponent} pageName="Listicle Blog Post" />
  );
}

export default ListBlog