import React from "react";
import { Link, navigate } from 'gatsby';
import { getUser, setUser } from "../utils/auth"
import firebase from "gatsby-plugin-firebase"

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import "../assets/vendor/nucleo/css/nucleo.css";
import "../assets/vendor/font-awesome/css/font-awesome.min.css";
import "../assets/scss/argon-design-system-react.scss?v1.1.0";

// core components
import DemoNavbar from "../components/Navbars/DemoNavbar.js";
import SimpleFooter from "../components/Footers/SimpleFooter.js";

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: 'Please enter a valid email.',
      error: false,
      buttonDisabled: false,
      passStrength: 'weak',
      passCheck: 'text-danger font-weight-700',
      email: '',
      password: '',
      fname: '',
      lname: ''
    }

    this.showError = this.showError.bind(this);
    this.reg = this.reg.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateFName = this.updateFName.bind(this);
    this.updateLName = this.updateLName.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  showError (msg) {
    this.setState({ errorMsg: msg });
    this.setState({ error: true });
    this.setState({ buttonDisabled: false });
  }

  validateEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
  }

  validatePassword (pass) {
    let re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/);
    return re.test(String(pass));
  }

  checkPassStrength () {
    if (!this.validatePassword(this.state.password)) {
      this.setState({ passStrength: 'weak', passCheck: 'text-danger font-weight-700' });
    } else {
      this.setState({ passStrength: 'strong', passCheck: 'text-success font-weight-700' });
    }
  }

  updateEmail (e) {
    this.setState({ email: String(e.target.value).toLowerCase() });
  }

  updateFName (e) {
    this.setState({ fname: String(e.target.value) });
  }

  updateLName (e) {
    this.setState({ lname: String(e.target.value) });
  }

  updatePassword (e) {
    this.setState({ password: String(e.target.value) });
    this.checkPassStrength();
  }

  async reg (e) {
    e.preventDefault();
    this.setState({ buttonDisabled: true });

    if (this.state.fname.trim() == '' || this.state.lname.trim() == '') {
      this.showError('Please enter your first and last name.');
      return;
    } else if (!this.validateEmail(this.state.email)) {
      this.showError('Please enter a valid email.');
      return;
    } else if (!this.validatePassword(this.state.password)) {
      this.showError('Password be at least 8 characters long and contain at least: One lower case letter, one upper case letter, one number, and one special character');
      return;
    } else {
      this.setState({ error: false });
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
      } catch (error) {
        if (error.code == 'auth/email-already-in-use') {
          this.showError('A user already exists with this email.');
          return;
        }
        else if (error.code == 'auth/weak-password') {
          this.showError('Password not strong enough.');
          return;
        }
        else {
          this.showError('An unknown error occured.');
          return;
        }
      }
      try {
        var idToken = await firebase.auth().currentUser.getIdToken(true);
        var resp = await fetch('https://us-central1-scribeo-ai.cloudfunctions.net/createUser', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_name: this.state.fname.trim(),
            last_name: this.state.lname.trim(),
            email: this.state.email.trim(),
            token: idToken
          })
        })
        await setUser();
        navigate('/app');
      } catch {
        this.showError('An unknown error occured.');
        return;
      }
    }
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader>
                      <p className="text-center display-2 mb-0">
                        Register
                      </p>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="First Name" type="text" onChange={this.updateFName} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Last Name" type="text" onChange={this.updateLName} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" onChange={this.updateEmail} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              onChange={this.updatePassword}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-muted font-italic">
                          <small>
                            password strength:{" "}
                            <span className={this.state.passCheck}>
                              {this.state.passStrength}
                            </span>
                          </small>
                        </div>
                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="customCheckRegister"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckRegister"
                              >
                                <span>
                                  I agree with the{" "}
                                  <a
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Privacy Policy
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            onClick={this.reg}
                            dissabled={this.state.buttonDisabled}
                          >
                            Create account
                          </Button>
                        </div>
                      </Form>
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
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Register;
