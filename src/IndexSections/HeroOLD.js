import React from "react";
import Typist from 'react-typist';

// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  Button,
  Container,
  Row,
  Col } from "reactstrap";

class Hero extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative">
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                    <p className="display-1 text-white">
                      Write more,<br />stress less.
                    </p>
                    <p className="lead text-white">
                      What if you could write copy like a pro and still have time to run your business? Our AI helps you create professional level copy in seconds. Enter your email below and get notified when we launch beta.
                    </p>
                    <Form>
                      <FormGroup>
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                          type="email"
                          
                        />
                      </FormGroup>
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0"
                        color="default"
                        href=""
                        size="lg"
                      >
                        Get Early Access
                      </Button>
                    </Form>
                  </Col>
                  <Col className="text-center" sm="6">
                    <Typist>
                      <p className="display-1 text-white">
                        Create  Landing pages
                        <Typist.Backspace count={13} delay={1000} />
                        Facebook ads
                        <Typist.Backspace count={12} delay={1000} />
                        Product descriptions
                      </p>
                    </Typist>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Hero;
