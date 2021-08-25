import React from "react"
import { navigate } from "gatsby"
import Admin from "../layouts/admin"
import LandingPage from "../privateComponents/Pages/landingPage"

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

const landingPage = ({ component: Component, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/login`) {
//     navigate("/login")
//     return null
//   }

  return (
    <>
      <Admin component={LandingPage} pageName="Landing Page" />
    </>
  );
}

export default landingPage