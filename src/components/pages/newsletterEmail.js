import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import NewsEmail from "../privateComponents/Pages/newsEmail"

const NewsletterEmail = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={NewsEmail} pageName="Newsletter Email" type="newsletter" />
  );
}

export default NewsletterEmail