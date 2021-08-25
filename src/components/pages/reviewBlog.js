import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import ReviewBlogComponent from "../privateComponents/Pages/reviewBlogComponent"

const ReviewBlog = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={ReviewBlogComponent} pageName="Review Blog Post" />
  );
}

export default ReviewBlog