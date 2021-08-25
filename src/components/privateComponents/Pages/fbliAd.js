import React, { Component } from "react";

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

import EditCard from '../Components/editCard'
import SelectionCard from '../Components/selectionCard'
import { createConent } from "../../../utils/createContent";
import { verify } from "../../../utils/verify";
import StepContainer from '../Components/stepContainer';
import FormController from '../Components/formController';
import Selector from '../Components/selector'
import RichTextEditor from '../Components/richTextEditor'
import "../../../assets/vendor/nucleo/css/nucleo.css";
import SourceSelector from "../Components/sourceSelector";
import AdDisplay from "../Components/adDisplay"
import { parseResponseSections } from "../../../utils/parseResponseSections";

class FBLIAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            values: {},
            headline: '',
            description: '',
            primary: '',
            error: false,
            errorMsg: '',
            errorIds: [],
            loading: false
        }

        this.setAPIValue = this.setAPIValue.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleStep1Next = this.handleStep1Next.bind(this);
    }

    setAPIValue (key, value) {
        var current = this.state.values;
        current[key] = value;
        this.setState({ values: current });
    }

    updateValues (key, value) {
        var current = this.state.values;
        current[key] = value;
        this.setState({ values: current });
    }

    handleBack () {
        if (this.state.step > 1) {
            this.setState({ step: this.state.step-1 });
        }
    }

    verifyResp (resp) {
        if ('response' in resp && 'length' in resp.response && resp.response.length > 0) {
            return true;
        } else {
            this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
        }
    }

    handleStep1Next () {
        var required = ['product', 'features', 'cta'];
        var missing = verify(required, this.state.values);
        if (missing.length > 0) {
            this.setState({ errorMsg: 'Please fill out the fields: ' + missing.join(', '), error: true, errorIds: missing });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var apiProps = {
                type: 'fbli_ad',
                ...this.state.values
            }
            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    try {
                        var sections = parseResponseSections(['Headline', 'Primary Text', 'Description'], resp.response[0]);
                        var primary = '';
                        var headline = '';
                        var description = '';
                        for (var i = 0; i < sections.length; i++) {
                            if (sections[i].title == 'Headline') {
                                headline = sections[i].text;
                            } else if (sections[i].title == 'Primary Text') {
                                primary = sections[i].text;
                            } else if (sections[i].title == 'Description') {
                                description = sections[i].text;
                            }
                        }
                        if (primary && headline && description) {
                            this.setState({ headline: headline, primary: primary, description: description, step: 2, loading: false });
                        } else {
                            this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
                        }
                    } catch {
                        this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
                    }
                }
            }).catch((e) => {
                this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
            });
        }
    }

    render() {
        return (
            <StepContainer step={this.state.step} disabled={false} error={this.state.error} errorMsg={this.state.errorMsg} loading={this.state.loading} handleBack={this.handleBack} >
                <div step='1' handleNext={this.handleStep1Next} title={this.props.pageName}>
                    <FormController updateValues={this.updateValues} errorIds={this.state.errorIds} currentValues={this.state.values}>
                        <div
                            required={true}
                            inputId='product'
                            title='Product Name'
                            description="Enter the name of the product or service you'd like to generate the ad copy for."
                            type='text'
                            maxlength='40'
                            placeholder='e.g. Scribeo'
                        />
                        <div
                            required={true}
                            inputId='features'
                            title='Product Features'
                            description="List the important features and benafits of the product/service. Put each feature on a seperate line."
                            type='textarea'
                            rows='3'
                            maxlength='300'
                            placeholder={"e.g. AI generated landing pages\nproduct descriptions\nfacebook ads\nlinkedin ads"}
                        />
                        <div
                            required={true}
                            inputId='cta'
                            title='Call to Action'
                            description="Enter a call to action for the email."
                            type='text'
                            maxlength='40'
                            placeholder='e.g. try it now'
                        />
                    </FormController>
                </div>
                <div step='2' reloadHandler={this.handleStep1Next} title={this.props.pageName}>
                    <p>Copy your ad text by clicking on it.</p>
                    <AdDisplay type={this.props.type} primary={this.state.primary} headline={this.state.headline} description={this.state.description} name={this.state.values.product} cta={this.state.values.cta} />
                </div>
            </StepContainer>
        );
    }
}

export default FBLIAd;
