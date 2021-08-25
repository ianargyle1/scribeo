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

class ProductDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            values: {},
            fulltext: '',
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
        var required = ['product', 'features'];
        var missing = verify(required, this.state.values);
        if (missing.length > 0) {
            this.setState({ errorMsg: 'Please fill out the fields: ' + missing.join(', '), error: true, errorIds: missing });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var apiProps = {
                type: 'product_description',
                ...this.state.values
            }
            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    this.setState({ fulltext: resp.response[0], step: 2, loading: false });
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
                            placeholder={"e.g. Landing pages\nproduct descriptions\nfacebook ads\nlinkedin ads"}
                        />
                    </FormController>
                </div>
                <div step='2' reloadHandler={this.handleStep1Next} title={this.props.pageName}>
                    <p>Edit and copy your product description below.</p>
                    <RichTextEditor key={this.state.fulltext} text={this.state.fulltext} />
                </div>
            </StepContainer>
        );
    }
}

export default ProductDescription;
