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

class EmailNoSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            step: 1,
            values: {}
        }

        this.setErrorIds = this.setErrorIds.bind(this);
        this.updateValues = this.updateValues.bind(this);
    }

    updateValues (key, value) {
        var current = this.state.values;
        current[key] = value;
        this.setState({ values: current });
    }

    setErrorIds (ids) {
        this.setState({errorIds: ids});
    }

    render() {
        return (
            <StepContainer save={{name: this.state.name, type: this.props.type + '-email', values: this.state.values}} setErrorIds={this.setErrorIds} updateValues={this.updateValues} updateName={(e) => this.setState({ name: e.target.value.trim() })} step={this.state.step}>
                <div step='1' title={this.props.pageName} next={{required: ['business', 'description'], type: this.props.type + '_email_subject', values: this.state.values, key: 'subjects'}}>
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
                    </FormController>
                </div>
                <div step='2' title='Subject Lines' next={{required: ['business', 'description', 'subject'], type: this.props.type + '_email_fulltext', values: this.state.values, updateValues: this.updateValues, key: 'fulltext'}}>
                    <p>Select or edit your favorite subject line below.</p>
                    <Selector choices={this.state.values.subjects} selected={this.state.values.subject} handleSelect={(text) => this.updateValues('subject', text)} handleDeselect={() => this.updateValues('subject', '')} onChange={(text, index) => { var vals = this.state.values; vals.subjects[index] = text; this.setState({ values: vals }) } } />
                </div>
                <div step='3' reloadHandler={this.handleSubjectsNext} title='Full Email'>
                    <p>Edit and copy your email below.</p>
                    <RichTextEditor key={this.state.values.fulltext} text={this.state.values.fulltext} onChange={(text) => console.log(text)} />
                </div>
            </StepContainer>
        );
    }
}

export default EmailNoSummary;
