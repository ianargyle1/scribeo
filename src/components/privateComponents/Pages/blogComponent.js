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

var skipSteps = {};

class GeneralBlogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            values: {},
            titles: [],
            sources: [],
            condensed: [],
            title: '',
            intro: '',
            researchInfo: false,
            error: false,
            errorMsg: '',
            errorIds: [],
            loading: false
        }

        this.setAPIValue = this.setAPIValue.bind(this);
        this.handleResearchMouseEnter = this.handleResearchMouseEnter.bind(this);
        this.handleResearchMouseLeave = this.handleResearchMouseLeave.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleStep1Next = this.handleStep1Next.bind(this);
        this.handleTitlesNext = this.handleTitlesNext.bind(this);
        this.handleIntrosNext = this.handleIntrosNext.bind(this);
        this.handleTitlesSearchNext = this.handleTitlesSearchNext.bind(this);
        this.handleSourcesNext = this.handleSourcesNext.bind(this);
        this.handleIntrosSearchNext = this.handleIntrosSearchNext.bind(this);
    }

    setAPIValue (key, value) {
        var current = this.state.values;
        current[key] = value;
        this.setState({ values: current });
    }

    handleResearchMouseEnter () {
        this.setState({ researchInfo: true });
    }

    handleResearchMouseLeave () {
        this.setState({ researchInfo: false });
    }

    updateValues (key, value) {
        var current = this.state.values;
        current[key] = value;
        this.setState({ values: current });
    }

    handleBack () {
        if (this.state.step > 1) {
            var prev_step = this.state.step-1;
            while (prev_step > 1 && skipSteps[prev_step]) {
                prev_step--;
            }
            this.setState({ step: prev_step });
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
        if (this.state.values.research) {
            var required = ['topic'];
            if (this.state.values.branded) {
                required.push('product');
                required.push('description');
            }

            var missing = verify(required, this.state.values);

            if (missing.length > 0) {
                this.setState({ errorMsg: 'Please fill out the fields: ' + missing.join(', '), error: true, errorIds: missing });
            } else {
                this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

                var apiProps = {
                    type: 'article_sources',
                    research: true,
                    topic: this.state.values.topic
                }
                createConent(apiProps).then(resp => {
                    if ('length' in resp && resp.length > 0) {
                        this.setState({ sources: resp, step: 2, loading: false });
                    } else {
                        this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
                    }
                }).catch((e) => {
                    this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
                });
            }
        } else {
            var required = ['summary'];
            if (this.state.values.branded) {
                required.push('product');
                required.push('description');
            }

            var missing = verify(required, this.state.values);

            if (missing.length > 0) {
                this.setState({ errorMsg: 'Please fill out the fields: ' + missing.join(', '), error: true, errorIds: missing });
            } else {
                this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

                if (this.state.values.title && this.state.values.title.trim().length > 0) {
                    skipSteps[2] = true;
                    this.handleTitlesNext();
                    return;
                }
                this.skipSteps = {};

                var apiProps = {
                    type: this.props.type + '_article_title',
                    research: false,
                    summary: this.state.values.summary
                }
                createConent(apiProps).then(resp => {
                    if (this.verifyResp(resp)) {
                        this.setState({ titles: resp.response, step: 2, loading: false });
                    }
                }).catch((e) => {
                    this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
                });
            }
        }
    }

    handleSourcesNext () {
        if (!this.state.values.sources || this.state.values.sources.length <= 0) {
            this.setState({ errorMsg: 'Please select at least one source.', error: true });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            if (this.state.values.title && this.state.values.title.trim().length > 0) {
                skipSteps[3] = true;
                this.handleTitlesSearchNext();
                return;
            }
            this.skipSteps = {};

            var apiProps = {
                type: 'article_title',
                research: true,
                sources: this.state.values.sources
            }

            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    this.setState({ titles: resp.response, step: 3, loading: false });
                }
            }).catch((e) => {
                this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
            });
        }
    }

    handleTitlesNext () {
        if (!this.state.values.title || this.state.values.title.trim() == '') {
            this.setState({ errorMsg: 'Please select a title.', error: true });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var apiProps = {
                type: this.props.type + '_article_intro',
                research: false,
                title: this.state.values.title,
                summary: this.state.values.summary
            }

            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    this.setState({ intros: resp.response, step: 3, loading: false });
                }
            }).catch((e) => {
                this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
            });
        }
    }

    handleTitlesSearchNext () {
        if (!this.state.values.title || this.state.values.title.trim() == '') {
            this.setState({ errorMsg: 'Please select a title.', error: true });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var apiProps = {
                type: this.props.type + '_article_intro',
                research: true,
                title: this.state.values.title,
                sources: this.state.values.sources
            }

            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    this.setState({ intros: resp.response, condensed: resp.condensed, step: 4, loading: false });
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
                type: this.props.type + '_article_fulltext',
                ...this.state.values
            }

            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    this.setState({ fulltext: resp.response[0], step: 4, loading: false });
                }
            }).catch((e) => {
                this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
            });
        }
    }

    handleIntrosSearchNext () {
        if (!this.state.values.intro || this.state.values.intro.trim() == '') {
            this.setState({ errorMsg: 'Please select an intro.', error: true });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var apiProps = {
                type: this.props.type + '_article_fulltext',
                condensed: this.state.condensed,
                ...this.state.values
            }

            createConent(apiProps).then(resp => {
                if (this.verifyResp(resp)) {
                    this.setState({ fulltext: resp.response[0], step: 5, loading: false });
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
                            inputId='branded'
                            title='Include Your Brand'
                            description='Check the box below to include your product or brand in the blog post for content marketing purposes.'
                            type='checkbox'
                            label='Include Your Brand'
                        />
                        <div
                            required={true}
                            inputId='product'
                            showWhen={this.state.values.branded}
                            title='Product Name'
                            description="Enter the name of the product or service you'd like to be included in post."
                            type='text'
                            maxlength='40'
                            placeholder='e.g. Scribeo'
                        />
                        <div
                            required={true}
                            inputId='description'
                            showWhen={this.state.values.branded}
                            title='Product description'
                            description="Enter a description of the product or service entered above."
                            type='textarea'
                            rows='2'
                            maxlength='200'
                            placeholder="e.g. Scribeo uses AI to generate written content for businesses that's almost indistinguishable from human writers. Scibeo can write blog posts, emails, ad copy, website content, ideas, and more."
                        />
                        <div
                            required={true}
                            inputId='topic'
                            showWhen={this.state.values.research}
                            title='Topic'
                            description="Enter the topic you'd like to write about."
                            type='text'
                            maxlength='70'
                            placeholder='e.g. AI generated marketing content'
                        />
                        <div
                            required={true}
                            inputId='summary'
                            showWhen={!this.state.values.research}
                            title='Brief Summary'
                            description="Try to include all the information needed to write your post. If you can't fit everything here, check out the more options section below."
                            type='textarea'
                            rows='2'
                            maxlength='400'
                            placeholder='e.g. AI generated content can help your business grow faster than relying on human writers. With tools like Scribeo you can generate entire blog posts or emails in seconds, allowing your business to scale faster.'
                        />
                        <div
                            required={true}
                            inputId='research'
                            type='checkbox'
                            label=
                                {
                                    <>
                                        <Popover
                                            placement="top"
                                            isOpen={this.state.researchInfo}
                                            target="research_info_icon"
                                            className="popover-primary"
                                        >
                                            <PopoverBody>
                                                Check this box to automatically generate a blog post based on a topic and sources you can select in the next step.
                                            </PopoverBody>
                                        </Popover>
                                        Include research <img src={require("../../../images/info_icon.png").default} id='research_info_icon' style={{ verticalAlign: 'middle', width: '1.25em', opacity: '0.6' }} onMouseEnter={this.handleResearchMouseEnter} onMouseLeave={this.handleResearchMouseLeave}/>
                                    </>
                                }
                        />
                        <div
                            required={false}
                            inputId='title'
                            title='Title'
                            description="The title of your post. If this is left blank one will be generated for you."
                            type='text'
                            maxlength='80'
                            placeholder="e.g. AI Generated Content: The Future of Content Marketing"
                        />
                        <div
                            required={false}
                            inputId='info'
                            title='Extra Information'
                            description="Any information that's important for your blog posts but isn't included in the summary."
                            type='textarea'
                            rows='2'
                            maxlength='300'
                            placeholder={"e.g. Scribeo has a 7 day free trial.\nContent written using Scribeo is 100% original.\nAll content that is produced is yours to use for commercial purposes."}
                        />
                        <div
                            required={false}
                            inputId='quotes'
                            title='Quotes'
                            description="Quotes you want included in the article. Inlude the quote and who it's from."
                            type='textarea'
                            rows='2'
                            maxlength='200'
                            placeholder={`e.g. "Scribeo is perfect for small and large businesses alike." - Scribeo CEO Ian Argyle`}
                        />
                        <div
                            required={false}
                            inputId='keywords'
                            title='Keywords'
                            placeholder='e.g. scribeo, AI, AI marketing, AI copywriting'
                            type='keywords'
                            maxlength='30'
                        />
                    </FormController>
                </div>
                <div step='2' handleNext={this.handleTitlesNext} reloadHandler={this.handleStep1Next} showWhen={!this.state.values.research} title='Titles'>
                    <p>Select or edit your favorite title below.</p>
                    <Selector choices={this.state.titles} key={this.state.titles} selected={this.state.values.title} handleSelect={(text) => this.setAPIValue('title', text)} handleDeselect={() => this.setAPIValue('title', '')} />
                </div>
                <div step='2' handleNext={this.handleSourcesNext} reloadHandler={this.handleStep1Next} showWhen={this.state.values.research} title='Sources'>
                    <p>The sources below will be used to help write your blog post. Choose up to three below.</p>
                    <SourceSelector sources={this.state.sources} key={this.state.sources} selected={this.state.values.sources} update={(sources) => this.setAPIValue('sources', sources)} />
                </div>
                <div step='3' handleNext={this.handleTitlesSearchNext} reloadHandler={this.handleSourcesNext} showWhen={this.state.values.research} title='Titles'>
                    <p>Select or edit your favorite title below.</p>
                    <Selector choices={this.state.titles} key={this.state.titles} selected={this.state.values.title} handleSelect={(text) => this.setAPIValue('title', text)} handleDeselect={() => this.setAPIValue('title', '')} />
                </div>
                <div step='3' handleNext={this.handleIntrosNext} reloadHandler={this.handleTitlesNext} showWhen={!this.state.values.research} title='Introductions'>
                    <p>Select or edit your favorite intro below.</p>
                    <Selector choices={this.state.intros} key={this.state.intros} selected={this.state.values.intro} handleSelect={(text) => this.setAPIValue('intro', text)} handleDeselect={() => this.setAPIValue('intro', '')} />
                </div>
                <div step='4' handleNext={this.handleIntrosSearchNext} reloadHandler={this.handleTitlesSearchNext} showWhen={this.state.values.research} title='Introductions'>
                    <p>Select or edit your favorite intro below.</p>
                    <Selector choices={this.state.intros} key={this.state.intros} selected={this.state.values.intro} handleSelect={(text) => this.setAPIValue('intro', text)} handleDeselect={() => this.setAPIValue('intro', '')} />
                </div>
                <div step='4' reloadHandler={this.handleIntrosNext} showWhen={!this.state.values.research} title='Full Blog Post'>
                    <p>Edit and copy your blog post below.</p>
                    <RichTextEditor key={this.state.values.intro + '\n' + this.state.fulltext} text={this.state.values.intro + '\n' + this.state.fulltext} />
                </div>
                <div step='5' reloadHandler={this.handleIntrosSearchNext} showWhen={this.state.values.research} title='Full Blog Post'>
                    <p>Edit and copy your blog post below.</p>
                    <RichTextEditor key={this.state.values.intro + '\n' + this.state.fulltext} text={this.state.values.intro + '\n' + this.state.fulltext} />
                </div>
            </StepContainer>
        );
    }
}

export default GeneralBlogComponent;
