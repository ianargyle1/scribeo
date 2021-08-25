import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import ProductDescription from "../privateComponents/Pages/productDescription"

const productDescription = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
      <Admin component={ProductDescription} pageName="Product Description" />
  );
}

export default productDescription