import React from "react";

// reactstrap components
import {
  FormGroup,
  Input,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  Alert
} from "reactstrap";

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: 'Please enter a valid email.',
      error: false,
      thankYouModal: false,
      email: null,
      buttonDisabled: false
    }

    this.toggleThankYou = this.toggleThankYou.bind(this);
    this.showError = this.showError.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  toggleThankYou () {
    this.setState({ thankYouModal: !this.state.thankYouModal })
  }

  showError (msg) {
    this.setState({ errorMsg: msg })
    this.setState({ error: true })
  }

  updateEmail (e) {
    this.setState({ email: String(e.target.value).toLowerCase() });
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
  }

  handleSignup (e) {
    e.preventDefault();
    this.setState({ buttonDisabled: true });
    if (!this.validateEmail(this.state.email)) {
      this.showError("Please enter a valid email.");
      this.setState({ buttonDisabled: false });
      return;
    } else {
      this.setState({ error: false });
    }
    fetch('https://us-central1-scribeo-ai.cloudfunctions.net/addMailchimpSubscriber', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        merge_fields: { SOURCE: 'pre-launch' }
      })
    }).then((resp) => {
      if (resp.status == 500) {
        this.showError("An unknown error occured, please try again.");
      } else {
        this.toggleThankYou();
      }
      this.setState({ buttonDisabled: false });
    });
  }

  render() {
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.thankYouModal}
          toggle={this.toggleThankYou}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Thank You!
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleThankYou}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              We just sent a confirmation email, it may take a few minutes to arrive (check your spam).
            </p>
            <p>
              We will email you again after we launch beta testing with directions on how to participate.
            </p>
          </div>
          <div className="modal-footer">
            <Button
              className="ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleThankYou}
            >
              Close
            </Button>
          </div>
        </Modal>
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
            <Container className="shape-container d-flex align-items-center py-xl">
                <Row className="align-items-center justify-content-center ml-2 mr-2 ml-lg-0 mr-lg-0">
                  <Col lg="7">
                    <p className="display-1 text-white">
                      <div style={{fontWeight: 900}}>Write more,</div>
                      <div style={{fontWeight: 100}}>stress less.</div>
                    </p>
                    <p className="lead text-white mr-0 mr-lg-5">
                      What if you could write copy like a pro and still have time to run your business? Our AI helps you create professional level copy in seconds.
                    </p>
                  </Col>
                  <Col lg="5" className="mt-5 mt-lg-0">
                    <Card className="shadow border-0">
                      <CardBody className="py-5">
                        <p className="display-4 text-gray">Get Early Access</p>
                        <p className="text-gray mr-5">Enter your email below to get early access when we launch beta.</p>
                        <FormGroup>
                          <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            onChange={this.updateEmail}
                            />
                        </FormGroup>
                        <FormGroup  className="pull-left">
                            <Button color="primary" type="button" onClick={this.handleSignup} disabled={this.state.buttonDisabled}>
                              Get Early Access
                            </Button>
                        </FormGroup>
                        {this.state.error &&
                        <div>
                          <p><br /></p>
                          <Alert color="danger">
                            <strong>Error.</strong> {this.state.errorMsg}
                          </Alert>
                        </div>}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
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
