/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link, navigate } from "gatsby";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  goToLogin = () => {
    navigate('/login');
  }

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    const logoStyle = {
      width: "180px",
      height: "auto"
    };

    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              {/* <p style={{ letterSpacing: -2 }} className="display-2 text-white">Scribeo</p> */}
              <NavbarBrand className="mr-lg-10" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("../../images/logo.png").default}
                />
              </NavbarBrand>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', marginTop: '1rem' }}>
                <p className="text-white mb-0 mr-4">support@scribeo.ai</p>
                <Button onClick={this.goToLogin}>Login</Button>
              </div>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
