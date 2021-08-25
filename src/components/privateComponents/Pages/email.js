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

class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            values: {},
            subjects: [],
            error: false,
            errorMsg: '',
            errorIds: [],
            loading: false
        }

        this.setAPIValue = this.setAPIValue.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleStep1Next = this.handleStep1Next.bind(this);
        this.handleSubjectsNext = this.handleSubjectsNext.bind(this);
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
        var required = ['business', 'description'];
        var missing = verify(required, this.state.values);
        if (missing.length > 0) {
            this.setState({ errorMsg: 'Please fill out the fields: ' + missing.join(', '), error: true, errorIds: missing });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var apiProps = {
                type: this.props.type + '_email_subject',
                ...this.state.values
            }
            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    this.setState({ subjects: resp.response, step: 2, loading: false });
                }
            }).catch((e) => {
                this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
            });
        }
    }

    handleSubjectsNext () {
        if (!this.state.values.subject || this.state.values.subject.trim() == '') {
            this.setState({ errorMsg: 'Please select at least one subject.', error: true });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var apiProps = {
                type: this.props.type + '_email_fulltext' + (this.state.values.cta && this.state.values.cta.trim() ? '_cta' : ''),
                ...this.state.values
            }

            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    this.setState({ fulltext: resp.response[0], step: 3, loading: false });
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
                            inputId='business'
                            title='Business Name'
                            description="Enter the name of the business you'd like to generate the email for."
                            type='text'
                            maxlength='40'
                            placeholder='e.g. Scribeo'
                        />
                        <div
                            required={true}
                            inputId='description'
                            title='Business Description'
                            description="Enter a description of the business entered above."
                            type='textarea'
                            rows='2'
                            maxlength='200'
                            placeholder="e.g. Scribeo uses AI to generate written content for businesses that's almost indistinguishable from human writers. Scibeo can write blog posts, emails, ad copy, website content, ideas, and more."
                        />
                        <div
                            required={false}
                            inputId='cta'
                            title='Call to Action'
                            description="Enter a call to action for the email."
                            type='text'
                            maxlength='40'
                            placeholder='e.g. sign up now'
                        />
                        <div
                            required={false}
                            inputId='summary'
                            title='Email Summary'
                            description="Enter a summary of the email."
                            type='textarea'
                            rows='2'
                            maxlength='300'
                            placeholder='e.g. AI generated content can help your business grow faster than relying on human writers. With tools like Scribeo you can generate entire blog posts or emails in seconds, allowing your business to scale faster.'
                        />
                    </FormController>
                </div>
                <div step='2' handleNext={this.handleSubjectsNext} reloadHandler={this.handleStep1Next} title='Subject Lines'>
                    <p>Select or edit your favorite subject line below.</p>
                    <Selector choices={this.state.subjects} key={this.state.subjects} selected={this.state.values.subject} handleSelect={(text) => this.setAPIValue('subject', text)} handleDeselect={() => this.setAPIValue('subject', '')} />
                </div>
                <div step='3' reloadHandler={this.handleSubjectsNext} title='Full Email'>
                    <p>Edit and copy your email below.</p>
                    <RichTextEditor key={this.state.fulltext} text={this.state.fulltext} />
                </div>
            </StepContainer>
        );
    }
}

export default Email;
