import React from "react";

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardImg,
  Input,
  FormGroup,
  CardBody,
  Form,
  Container,
  Row,
  Col,
  Popover,
  PopoverBody
} from "reactstrap";
import "../../../assets/vendor/nucleo/css/nucleo.css";
import "../../../assets/css/custom.css";

class StepContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMsg: '',
            showNext: false
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleNext () {
        for (var i = 0; i < this.props.children.length; i++) {
            if (this.props.children[i].props.step == this.props.step && (('showWhen' in this.props.children[i].props && this.props.children[i].props.showWhen) || !('showWhen' in this.props.children[i].props))) {
                this.props.children[i].props.handleNext();
                break;
            }
        }
    }

    handleBack () {
        this.props.handleBack();
    }

    render() {
        return (
            <Container style={{maxWidth: '100%'}}>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} xl={6} className="mb-3">
                        <Card className="shadow">
                            <CardBody>
                                {this.props.children.map(child => (
                                    child.props.step == this.props.step ?
                                        ('showWhen' in child.props && child.props.showWhen) || !('showWhen' in child.props) ?
                                            <>
                                                <CardHeader className="bg-transparent border-0" style={{ paddingLeft: '0', paddingRight: '0' }}>
                                                    {child.props.title ? <span style={{ fontSize: '1.5em', fontWeight: '600' }}>{child.props.title}</span> : null}
                                                    {child.props.reloadHandler && typeof child.props.reloadHandler == 'function' ?
                                                        <img src={require("../../../images/reload_icon.png").default} onClick={child.props.reloadHandler} style={{ verticalAlign: 'middle', textAlign: 'right', width: '1.5em', opacity: '0.6', float: 'right', cursor: 'pointer' }} />
                                                    : null }
                                                    {this.props.saveHandler && typeof this.props.saveHandler == 'function' ?
                                                        <img src={require("../../../images/save_icon.png").default} onClick={this.props.saveHandler} style={{ verticalAlign: 'middle', textAlign: 'right', width: '1.5em', opacity: '0.6', float: 'right', cursor: 'pointer', marginRight: '1em' }} />
                                                    : null }
                                                </CardHeader>
                                                {child}
                                                { this.props.error ? 
                                                    <Col className="align-middle">
                                                        <Alert color="danger" className="mb-0 mt-4">
                                                            <strong>Error.</strong> {this.props.errorMsg}
                                                        </Alert>
                                                    </Col>
                                                : null }
                                                { parseInt(this.props.step) > 1 ?
                                                    <Button
                                                        className="my-4"
                                                        color="secondary"
                                                        type="button"
                                                        onClick={this.handleBack}
                                                        disabled={this.props.disabled}
                                                    >
                                                        Back
                                                    </Button>
                                                : null }
                                                { child.props.handleNext && typeof child.props.handleNext == 'function' ?
                                                    <Button
                                                        className="my-4"
                                                        color="primary"
                                                        type="button"
                                                        onClick={this.handleNext}
                                                        disabled={this.props.disabled}
                                                        style={{ float: 'right' }}
                                                    >
                                                        Next
                                                    </Button>
                                                : null}
                                            </>
                                        : null
                                    : null
                                ))}
                                { this.props.loading ? 
                                    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <p style={{ fontSize: '2em', fontWeight: '650', color: 'white', marginBottom: '0' }}>Loading</p>
                                                <p style={{ fontSize: '1.2em', color: 'white', paddingBottom: '1em' }}>This can take up to a minute. Do not navigate away from this page.</p>
                                                <span class="loader"></span>
                                            </div>
                                        </div>
                                    </div>
                                : null}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default StepContainer;
