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

import { createConent } from "../../../utils/createContent";
import { verify } from "../../../utils/verify";
import StepContainer from '../Components/stepContainer';
import FormController from '../Components/formController';
import Selector from '../Components/selector'
import RichTextEditor from '../Components/richTextEditor'
import "../../../assets/vendor/nucleo/css/nucleo.css";

class ReviewBlogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            values: {},
            titles: [],
            intro: '',
            error: false,
            errorMsg: '',
            errorIds: [],
            loading: false
        }

        this.setAPIValue = this.setAPIValue.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleStep1Next = this.handleStep1Next.bind(this);
        this.handleIntrosNext = this.handleIntrosNext.bind(this);
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
        var required = ['product', 'description', 'features', 'sentiment'];
        var missing = verify(required, this.state.values);

        if (missing.length > 0) {
            this.setState({ errorMsg: 'Please fill out the fields: ' + missing.join(', '), error: true, errorIds: missing });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var apiProps = {
                type: 'review_article_intro',
                ...this.state.values
            }
            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    this.setState({ intros: resp.response, step: 2, loading: false });
                }
            }).catch((e) => {
                this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
            });
        }
    }

    handleIntrosNext () {
        if (!this.state.values.intro || this.state.values.intro.trim() == '') {
            this.setState({ errorMsg: 'Please select an intro.', error: true });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var apiProps = {
                type: 'review_article_fulltext',
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
                            inputId='product'
                            title='Product Name'
                            description="Enter the name of the product or service you'd like to review."
                            type='text'
                            maxlength='40'
                            placeholder='e.g. Apple iPhone 12'
                        />
                        <div
                            required={true}
                            inputId='description'
                            title='Product description'
                            description="Enter a description of the product or service entered above."
                            type='textarea'
                            rows='2'
                            maxlength='200'
                            placeholder='e.g. iPhone 12 is the fourteenth-generation, lower-priced iPhones, succeeding the iPhone 11. They were unveiled at an Apple Special Event at Apple Park in Cupertino, California on October 13, 2020.'
                        />
                        <div
                            required={true}
                            inputId='features'
                            title='Product Features'
                            description="Enter the features of the product you want to be included in the post."
                            type='textarea'
                            rows='2'
                            maxlength='200'
                            placeholder={'e.g. 5G speed\nA14 bionic - the fastest ship in a smartphone\nEdge to edge OLED display'}
                        />
                        <div
                            required={true}
                            inputId='sentiment'
                            title='Review Sentiment'
                            description="Select the overall sentiment of the review you want to wright. Positive or negative."
                            type='dropdown'
                            options={['Positive', 'Negative']}
                        />
                        <div
                            required={false}
                            inputId='price'
                            title='Price'
                            description="Enter the price of the product. If it's a recurring charge, enter it as such."
                            type='text'
                            maxlength='20'
                            placeholder="e.g. $699 or $30.37/mo. for 24 mo."
                        />
                        <div
                            required={false}
                            inputId='pros'
                            title='Pros'
                            description="Enter the positive aspects of the product."
                            type='textarea'
                            rows='2'
                            maxlength='300'
                            placeholder={"e.g. Attractive new design\nComprehensive 5G coverage\nImpressive dual cameras\nFastest performance in a phone\nSolid battery life"}
                        />
                        <div
                            required={false}
                            inputId='cons'
                            title='Cons'
                            description="Enter the negative aspects of the product."
                            type='textarea'
                            rows='2'
                            maxlength='300'
                            placeholder={"e.g. Only 64GB of base storage\n60Hz display\nNo charger or headphones in box\nDigital zoom could still use work"}
                        />
                    </FormController>
                </div>
                <div step='2' handleNext={this.handleIntrosNext} reloadHandler={this.handleStep1Next} title='Introductions'>
                    <p>Select or edit your favorite intro below.</p>
                    <Selector choices={this.state.intros} key={this.state.intros} selected={this.state.values.intro} handleSelect={(text) => this.setAPIValue('intro', text)} handleDeselect={() => this.setAPIValue('intro', '')} />
                </div>
                <div step='3' reloadHandler={this.handleIntrosNext} title='Full Review'>
                    <p>Edit and copy your blog post below.</p>
                    <RichTextEditor key={this.state.values.intro + '\n' + this.state.fulltext} text={this.state.values.intro + '\n' + this.state.fulltext} />
                </div>
            </StepContainer>
        );
    }
}

export default ReviewBlogComponent;
