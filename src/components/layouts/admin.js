import React from "react";
import AdminNavbar from "../privateComponents/Navbars/AdminNavbar.js";
import AdminFooter from "../privateComponents/Footers/AdminFooter.js";
import Sidebar from "../privateComponents/Sidebar/Sidebar.js";

import "../../assets/vendor/nucleo/css/nucleo.css";

const Admin = ({ component: Component, ...rest }) => {
  return (
    <>
      <Sidebar
        {...rest}
        logo={{
          innerLink: "/app/",
          imgSrc: require("../../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        <AdminNavbar
          {...rest}
        />
        <section className="section section-lg px-5 pt-8" style={{ minHeight: '100vh' }}>
          <Component {...rest} />
        </section>
        {/* <Container fluid> */}
          {/* <AdminFooter /> */}
        {/* </Container> */}
      </div>
    </>
  );
};

export default Admin;
