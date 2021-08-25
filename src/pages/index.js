import React from "react";

import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

import "../assets/vendor/nucleo/css/nucleo.css";
import "../assets/vendor/font-awesome/css/font-awesome.min.css";
import "../assets/scss/argon-design-system-react.scss?v1.1.0";

// core components
import DemoNavbar from "../components/Navbars/DemoNavbar.js";

// index page sections
import Hero from "../IndexSections/Hero.js";

class IndexPage extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <main ref="main">
          <DemoNavbar />
          <Hero />
          <section className="section section-lg pt-lg-0 mt--100 px-5">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <h6 className="text-primary text-uppercase">
                            Sales Copy
                          </h6>
                          <div><i class="fa fa-check" aria-hidden="true" /><span className="ml-2">Facebook ads</span></div>
                          <div><i class="fa fa-check" aria-hidden="true" /><span className="ml-2">Google ads</span></div>
                          <div><i class="fa fa-check" aria-hidden="true" /><span className="ml-2">Landing Pages</span></div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <h6 className="text-primary text-uppercase">
                            Web Content
                          </h6>
                          <div><i class="fa fa-check" aria-hidden="true" /><span className="ml-2">Social media posts</span></div>
                          <div><i class="fa fa-check" aria-hidden="true" /><span className="ml-2">Blog posts</span></div>
                          <div><i class="fa fa-check" aria-hidden="true" /><span className="ml-2">Product descriptions</span></div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <h6 className="text-primary text-uppercase">
                            Ideas
                          </h6>
                          <div><i class="fa fa-check" aria-hidden="true" /><span className="ml-2">Content rewriter</span></div>
                          <div><i class="fa fa-check" aria-hidden="true" /><span className="ml-2">Value propisition generator</span></div>
                          <div><i class="fa fa-check" aria-hidden="true" /><span className="ml-2">Title generator</span></div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-small pb-0 px-5">
            <Container>
              <Row>
                <Col className="d-flex align-items-center justify-content-center" lg="6">
                  {/* <div className="position-relative pl-md-5"> */}
                    <img
                      alt="..."
                      className="img-center img-fluid w-100"
                      src={require("../images/ai_feature.jpg").default}
                    />
                  {/* </div> */}
                </Col>
                <Col className="align-self-center" lg="6">
                  <div className="pt-5 pt-lg-0 pl-lg-4">
                    <h3>Professional level copy</h3>
                    <p className="lead">
                      Scribeo's AI uses natural language processing and machine learning to write copy that is indistinguishable from a human writer. In fact, this entire page was written using our AI.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-small pb-0 px-5">
            <Container>
              <Row>
                <Col className="align-self-center" lg="6">
                  <div className="pr-lg-5">
                    <h3>Scalable</h3>
                    <p className="lead">
                      Scribeo's AI can write copy in seconds, which means you can scale your business without hiring more people.
                    </p>
                  </div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center" lg="6">
                  <img
                    alt="..."
                    className="img-center img-fluid w-100"
                    src={require("../images/Startup_Outline.png").default}
                  />
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default IndexPage;