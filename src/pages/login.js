import React from "react";
import { Link, navigate } from 'gatsby';
import { getUserData, setUser } from "../utils/auth"
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

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: 'Please enter a valid email.',
      error: false,
      buttonDisabled: false,
      email: '',
      password: '',
    }

    this.showError = this.showError.bind(this);
    this.login = this.login.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
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

  updateEmail (e) {
    this.setState({ email: String(e.target.value).toLowerCase() });
  }

  updatePassword (e) {
    this.setState({ password: String(e.target.value) });
  }

  async login (e) {
    e.preventDefault();
    this.setState({ buttonDisabled: true });
    if (!this.validateEmail(this.state.email)) {
      this.showError('Please enter a valid email.');
      return;
    } else if (this.state.password == '') {
      this.showError('Please enter a password.');
      return;
    } else {
      this.setState({ error: false });
      try {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
      } catch (error) {
        if (error.code == 'auth/user-not-found' || error.code == 'auth/wrong-password') {
          this.showError('Invalid email and/or password.');
          return;
        }
        else {
          this.showError('An unknown error occured.')
          return;
        }
      }
      try {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        await setUser();
        navigate('/app');
      } catch {
        this.showError('An unknown error occured.')
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
                        Login
                      </p>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
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
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={this.login}
                            disabled={this.state.buttonDisabled}
                          >
                            Sign in
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
                  <Row className="mt-3">
                    <Col xs="6">
                    <Link 
                        className="text-light"
                        to={`/forgot-password/`}
                      >
                          <small>Forgot password</small>
                        </Link>
                    </Col>
                    <Col className="text-right" xs="6">
                      <Link 
                        className="text-light"
                        to={`/Register/`}
                      >
                          <small>Create new account</small>
                        </Link>
                    </Col>
                  </Row>
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

export default Login;
