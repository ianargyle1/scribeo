import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import NewProjectComponent from "../privateComponents/Pages/newProjectComponent"

const NewProject = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={NewProjectComponent} pageName="New Project" />
  );
}

export default NewProject