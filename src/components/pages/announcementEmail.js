import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import NewsEmail from "../privateComponents/Pages/newsEmail"

const AnnouncementEmail = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={NewsEmail} pageName="Announcement Email" type="announcement" />
  );
}

export default AnnouncementEmail