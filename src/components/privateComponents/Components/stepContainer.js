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
import { saveProject } from "../../../utils/saveProject";
import { verify } from "../../../utils/verify";
import { createConent } from "../../../utils/createContent";
import "../../../assets/vendor/nucleo/css/nucleo.css";
import "../../../assets/css/custom.css";

class StepContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: this.props.step,
            loading: false,
            error: false,
            errorMsg: '',
            showNext: false,
            promptName: false
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.verifyResp = this.verifyResp.bind(this);
        this.handleReload = this.handleReload.bind(this);
    }

    handleNext () {
        for (var i = 0; i < this.props.children.length; i++) {
            console.log('mild', this.props.children[i])
            if (this.props.children[i].props.step == this.state.step && (('showWhen' in this.props.children[i].props && this.props.children[i].props.showWhen) || !('showWhen' in this.props.children[i].props))) {
                console.log('mild')
                this.handleStepNext(this.props.children[i].props.next);
                break;
            }
        }
    }

    handleStepNext ({required, type, values, key}, reload=false) {
        var missing = verify(required, values);
        if (missing.length > 0) {
            this.props.setErrorIds(missing);
            this.setState({ errorMsg: 'Please fill out the fields: ' + missing.join(', '), error: true });
        } else {
            this.props.setErrorIds([]);
            this.setState({ errorMsg: '', error: false, loading: true });

            var apiProps = {
                type: type,
                ...values
            }
            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    if (Array.isArray(resp.response) && resp.response.length > 1) {
                        this.props.updateValues(key, resp.response);
                    } else if (Array.isArray(resp.response) && resp.response.length === 1) {
                        this.props.updateValues(key, resp.response[0]);
                    } else {
                        this.props.updateValues(key, resp.response);
                    }
                    if (reload) {
                        this.setState({ loading: false });
                    } else {
                        this.setState({ step: this.state.step+1, loading: false });
                    }
                }
            }).catch((e) => {
                this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
            });
        }
    }

    verifyResp (resp) {
        if ('response' in resp && 'length' in resp.response && resp.response.length > 0) {
            return true;
        } else {
            this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
        }
    }

    handleBack () {
        if (this.state.step > 1) {
            this.setState({ step: this.state.step-1 });
        }
    }

    handleSave () {
        if (!this.props.save.name.trim()) {
            this.setState({ promptName: true });
        } else {
            try {
                this.setState({ promptName: false });
                saveProject({ time: Date.now(), step: this.state.step, ...this.props.save });
            } catch (e) {
                console.log(e);
                this.setState({ errorMsg: 'Unable to save project. Please try again.', error: true, loading: false });
            }
        }
    }

    handleReload () {
        for (var i = 0; i < this.props.children.length; i++) {
            if (this.props.children[i].props.step == this.state.step - 1 && (('showWhen' in this.props.children[i].props && this.props.children[i].props.showWhen) || !('showWhen' in this.props.children[i].props))) {
                this.handleStepNext(this.props.children[i].props.next, true);
                break;
            }
        }
    }

    render() {
        return (
            <Container style={{maxWidth: '100%'}}>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} xl={6} className="mb-3">
                        <Card className="shadow">
                            <CardBody>
                                {this.props.children.map(child => (
                                    child.props.step == this.state.step ?
                                        ('showWhen' in child.props && child.props.showWhen) || !('showWhen' in child.props) ?
                                            <>
                                                <CardHeader className="bg-transparent border-0" style={{ paddingLeft: '0', paddingRight: '0' }}>
                                                    {child.props.title ? <span style={{ fontSize: '1.5em', fontWeight: '600' }}>{child.props.title}</span> : null}
                                                    {this.state.step > 1 ?
                                                        <img src={require("../../../images/reload_icon.png").default} onClick={this.handleReload} style={{ verticalAlign: 'middle', textAlign: 'right', width: '1.5em', opacity: '0.6', float: 'right', cursor: 'pointer' }} />
                                                    : null }
                                                    <img src={require("../../../images/save_icon.png").default} onClick={this.handleSave} style={{ verticalAlign: 'middle', textAlign: 'right', width: '1.5em', opacity: '0.6', float: 'right', cursor: 'pointer', marginRight: '1em' }} />
                                                </CardHeader>
                                                {child}
                                                { this.state.error ? 
                                                    <Col className="align-middle">
                                                        <Alert color="danger" className="mb-0 mt-4">
                                                            <strong>Error.</strong> {this.state.errorMsg}
                                                        </Alert>
                                                    </Col>
                                                : null }
                                                { parseInt(this.state.step) > 1 ?
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
                                                { child.props.next && child.props.next.type ?
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
                                { this.state.loading ? 
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
                                { this.state.promptName ?
                                    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={() => this.setState({ promptName: false })}>
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                            <Card onClick={(e) => e.stopPropagation()}>
                                                <CardBody>
                                                    <p>Please enter a project name.</p>
                                                    <Input
                                                        className="form-control-alternative"
                                                        onChange={this.props.updateName}
                                                        type="text"
                                                    />
                                                    <Button
                                                        className="mt-4"
                                                        color="secondary"
                                                        type="button"
                                                        onClick={() => this.setState({ promptName: false })}
                                                        disabled={this.props.disabled}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        className="mt-4"
                                                        color="primary"
                                                        type="button"
                                                        onClick={this.handleSave}
                                                        style={{ float: 'right' }}
                                                    >
                                                        Save
                                                    </Button>
                                                </CardBody>
                                            </Card>
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
