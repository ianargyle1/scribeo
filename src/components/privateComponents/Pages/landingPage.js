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
import LandingPageView from "../Components/landingPageView/landingPageView";
import { parseResponseSections } from "../../../utils/parseResponseSections";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            values: {},
            errorIds: []
        }

        // this.setAPIValue = this.setAPIValue.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.postProcess = this.postProcess.bind(this);
        this.setErrorIds = this.setErrorIds.bind(this);
        this.verifyResp = this.verifyResp.bind(this);
        // this.handleBack = this.handleBack.bind(this);
        // this.handleStep1Next = this.handleStep1Next.bind(this);
    }

    // setAPIValue (key, value) {
    //     var current = this.state.values;
    //     current[key] = value;
    //     this.setState({ values: current });
    // }

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

    verifyResp (resp) {
        if ('response' in resp && 'length' in resp.response && resp.response.length > 0) {
            return true;
        } else {
            throw "An unkown error occured.";
        }
    }

    // handleStep1Next () {
    //     var required = ['product', 'description', 'features'];
    //     var missing = verify(required, this.state.values);
    //     if (missing.length > 0) {
    //         this.setState({ errorMsg: 'Please fill out the fields: ' + missing.join(', '), error: true, errorIds: missing });
    //     } else {
    //         this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

    //         var newPage = { headline: '', subheading: '', sections: [] };
    //         var apiProps = {
    //             type: 'page_header',
    //             ...this.state.values
    //         }

    //         createConent(apiProps).then(resp => {
    //             if (this.verifyResp(resp)) {
    //                 try {
    //                     var sections = parseResponseSections(['Headline', 'Subheading'], resp.response[0]);

    //                     for (var i = 0; i < sections.length; i++) {
    //                         if (sections[i].title == 'Headline') {
    //                             newPage.headline = sections[i].text;
    //                         } else if (sections[i].title == 'Subheading') {
    //                             newPage.subheading = sections[i].text;
    //                         }
    //                     }

    //                     apiProps = {
    //                         type: 'page_features',
    //                         ...this.state.values
    //                     }

    //                     createConent(apiProps).then(resp => {
    //                         if (this.verifyResp(resp)) {
    //                             try {
    //                                 sections = resp.response[0].split(/(\s+)?Section\s+\d+\s+/g).filter(s => { return s }).map(s => s.trim()).filter(s => { return s });
    //                                 for (var i = 0; i < sections.length; i++) {
    //                                     var subSections;
    //                                     try {
    //                                         subSections = parseResponseSections(['Title', 'Content'], sections[i]);
    //                                     } catch {
    //                                         continue;
    //                                     }
    //                                     var heading;
    //                                     var subheading;
    //                                     for (var j = 0; j < subSections.length; j++) {
    //                                         if (subSections[j].title == 'Title') {
    //                                             heading = subSections[j].text;
    //                                         } else if (subSections[j].title == 'Content') {
    //                                             subheading = subSections[j].text;
    //                                         }
    //                                     }
    //                                     newPage.sections.push({ headline: heading, subheading: subheading });
    //                                 }
    //                                 if (newPage.sections.length > 0) {
    //                                     this.setState({ page: newPage, step: 2, loading: false });
    //                                 } else {
    //                                     throw 'No sections.';
    //                                 }
    //                             } catch (e) {
    //                                 this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
    //                             }
    //                         }
    //                     }).catch((e) => {
    //                         this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
    //                     });

    //                 } catch {
    //                     this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
    //                 }
    //             }
    //         }).catch((e) => {
    //             this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
    //         });
    //     }
    // }

    async postProcess (response) {
        try {
            var sections = parseResponseSections(['Headline', 'Subheading'], response);
            var newPage = { headline: '', subheading: '', sections: [] };
            for (var i = 0; i < sections.length; i++) {
                if (sections[i].title == 'Headline') {
                    newPage.headline = sections[i].text;
                } else if (sections[i].title == 'Subheading') {
                    newPage.subheading = sections[i].text;
                }
            }

            var apiProps = {
                type: 'page_features',
                ...this.state.values
            }

            var resp = await createConent(apiProps)
            if (this.verifyResp(resp)) {
                sections = resp.response[0].split(/(\s+)?Section\s+\d+\s+/g).filter(s => { return s }).map(s => s.trim()).filter(s => { return s });
                for (var i = 0; i < sections.length; i++) {
                    var subSections;
                    try {
                        subSections = parseResponseSections(['Title', 'Content'], sections[i]);
                    } catch {
                        continue;
                    }
                    var heading;
                    var subheading;
                    for (var j = 0; j < subSections.length; j++) {
                        if (subSections[j].title == 'Title') {
                            heading = subSections[j].text;
                        } else if (subSections[j].title == 'Content') {
                            subheading = subSections[j].text;
                        }
                    }
                    newPage.sections.push({ headline: heading, subheading: subheading });
                }
                if (newPage.sections.length > 0) {
                    console.log(newPage)
                    return newPage;
                } else {
                    throw 'No sections.';
                }
            }
        } catch (e) {
            console.log(e)
            throw "An unknown error occured.";
        }
    }

    setErrorIds (ids) {
        this.setState({errorIds: ids});
    }

    render() {
        return (
            <StepContainer save={{name: this.state.name, type: 'landing-page', values: this.state.values}} setErrorIds={this.setErrorIds} updateValues={this.updateValues} updateName={(e) => this.setState({ name: e.target.value.trim() })} step={this.state.step}>
                <div step='1' title={this.props.pageName} next={{required: ['product', 'description', 'features'], type: 'page_header', values: this.state.values, key: 'page', postProcess: this.postProcess}}>
                    <FormController updateValues={this.updateValues} errorIds={this.state.errorIds} currentValues={this.state.values}>
                        <div
                            required={true}
                            inputId='product'
                            title='Product Name'
                            description="Enter the name of the product or service you'd like to generate the landing page for."
                            type='text'
                            maxlength='40'
                            placeholder='e.g. Scribeo'
                        />
                        <div
                            required={true}
                            inputId='description'
                            title='Product Description'
                            description="Enter a description of the product/service entered above."
                            type='textarea'
                            rows='2'
                            maxlength='200'
                            placeholder="e.g. Scribeo uses AI to generate written content for businesses that's almost indistinguishable from human writers. Scibeo can write blog posts, emails, ad copy, website content, ideas, and more."
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
                <div step='2' title='Landing Page'>
                    {console.log(this.state.values.page)}
                    {this.state.values.page ?
                        <LandingPageView page={this.state.values.page} />
                    : null}
                </div>
            </StepContainer>
        );
    }
}

export default LandingPage;
