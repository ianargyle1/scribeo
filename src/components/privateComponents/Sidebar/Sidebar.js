/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, { useState } from "react";
import { Link } from "gatsby"
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

import "../../../assets/scss/argon-dashboard-react.scss";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  // // verifies if routeName is the one active (in browser input)
  // // const activeRoute = (routeName) => {
  // //   return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  // // };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // // creates the links that appear in the left menu / Sidebar
  // // const createLinks = (routes) => {
  // //   return routes.map((prop, key) => {
  // //     return (
  // //       <NavItem key={key}>
  // //         <NavLink
  // //           to={prop.layout + prop.path}
  // //           onClick={closeCollapse}
  // //           activeClassName="active"
  // //         >
  // //           <i className={prop.icon} />
  // //           {prop.name}
  // //         </NavLink>
  // //       </NavItem>
  // //     );
  // //   });
  // // };

  // const { bgColor, routes, logo } = props;
  // let navbarBrandProps;
  // if (logo && logo.innerLink) {
  //   navbarBrandProps = {
  //     to: logo.innerLink,
  //     tag: Link,
  //   };
  // } else if (logo && logo.outterLink) {
  //   navbarBrandProps = {
  //     href: logo.outterLink,
  //     target: "_blank",
  //   };
  // }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <NavbarBrand className="mr-lg-10" to="/">
          <img
            alt="..."
            src={require("../../../images/logo_dark.png").default}
          />
        </NavbarBrand>
        <Collapse navbar isOpen={collapseOpen}>
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="/app">
                <i className="ni ni-spaceship" />
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/app/profile/settings">
                <i className="ni ni-settings-gear-65" />
                Settings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/app/help/tutorials">
                <i className="ni ni-hat-3" />
                Tutorials
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/app/help">
                <i className="ni ni-support-16" />
                Help
              </NavLink>
            </NavItem>
          </Nav>
          {/* <hr className="my-3" />
          <h6 className="navbar-heading text-muted">Documentation</h6>
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
              </NavLink>
            </NavItem>
          </Nav> */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

// Sidebar.propTypes = {
//   // links that will be displayed inside the component
//   routes: PropTypes.arrayOf(PropTypes.object),
//   logo: PropTypes.shape({
//     // innerLink is for links that will direct the user within the app
//     // it will be rendered as <Link to="...">...</Link> tag
//     innerLink: PropTypes.string,
//     // outterLink is for links that will direct the user outside the app
//     // it will be rendered as simple <a href="...">...</a> tag
//     outterLink: PropTypes.string,
//     // the image src of the logo
//     imgSrc: PropTypes.string.isRequired,
//     // the alt for the img
//     imgAlt: PropTypes.string.isRequired,
//   }),
// };

export default Sidebar;
