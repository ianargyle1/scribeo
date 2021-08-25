import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import PPPPCopy from "../privateComponents/Pages/ppppCopy"

const ppppCopy = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={PPPPCopy} pageName="4 P's Ad Copy" type="pppp" sections={['Picture', 'Promise', 'Prove', 'Push']} />
  );
}

export default ppppCopy