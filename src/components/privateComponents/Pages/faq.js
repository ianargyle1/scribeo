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
import DisplayCard from "../Components/displayCard";

class FAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            step: 1,
            values: {},
            // questions: [],
            // error: false,
            // errorMsg: '',
            // errorIds: [],
            // loading: false
        }

        this.setErrorIds = this.setErrorIds.bind(this);
        this.updateValues = this.updateValues.bind(this);
    }

    updateValues (key, value) {
        var current = this.state.values;
        current[key] = value;
        this.setState({ values: current });
    }

    // handleBack () {
    //     if (this.state.step > 1) {
    //         this.setState({ step: this.state.step-1 });
    //     }
    // }

    // verifyResp (resp) {
    //     if ('response' in resp && 'length' in resp.response && resp.response.length > 0) {
    //         return true;
    //     } else {
    //         this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
    //     }
    // }

    // handleStep1Next () {
    //     var required = ['product', 'description'];
    //     var missing = verify(required, this.state.values);
    //     if (missing.length > 0) {
    //         this.setState({ errorMsg: 'Please fill out the fields: ' + missing.join(', '), error: true, errorIds: missing });
    //     } else {
    //         this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

    //         var apiProps = {
    //             type: 'faq',
    //             ...this.state.values
    //         }
    //         createConent(apiProps).then(resp => {
    //             if (this.verifyResp(resp)) {
    //                 this.setState({ questions: resp.response, step: 2, loading: false });
    //             }
    //         }).catch((e) => {
    //             this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
    //         });
    //     }
    // }

    setErrorIds (ids) {
        this.setState({errorIds: ids});
    }

    render() {
        return (
            <StepContainer save={{name: this.state.name, type: 'faq', values: this.state.values}} setErrorIds={this.setErrorIds} updateValues={this.updateValues} updateName={(e) => this.setState({ name: e.target.value.trim() })} step={this.state.step} >
                <div step='1' title={this.props.pageName} next={{required: ['product', 'description'], type: 'faq', values: this.state.values, key: 'questions'}}>
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
                            inputId='description'
                            title='Product description'
                            description="Enter a description of the product or service entered above."
                            type='textarea'
                            rows='2'
                            maxlength='200'
                            placeholder="e.g. Scribeo uses AI to generate written content for businesses that's almost indistinguishable from human writers. Scibeo can write blog posts, emails, ad copy, website content, ideas, and more."
                        />
                    </FormController>
                </div>
                <div step='2' title={this.props.pageName}>
                    <p>Copy your questions below.</p>
                    {this.state.values.questions.map(question => 
                        <DisplayCard text={question} />
                    )}
                </div>
            </StepContainer>
        );
    }
}

export default FAQ;
