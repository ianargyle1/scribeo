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
import StepContainer from '../Components/stepContainer';
import FormComponent from '../Components/formComponent';
import Selector from '../Components/selector'
import RichTextEditor from '../Components/richTextEditor'
import "../../../assets/vendor/nucleo/css/nucleo.css";

class ListBlogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            // listitems: [{ title: '', summary: '' }],
            values: {listitems: [{ title: '', summary: '' }]},
            // titles: [],
            // topic: '',
            // title: '',
            // intro: '',
            error: false,
            errorMsg: '',
            errorIds: [],
            loading: false,
            addWarn: false
        }

        // this.setAPIValue = this.setAPIValue.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.updateFormValues = this.updateFormValues.bind(this);
        // this.handleBack = this.handleBack.bind(this);
        // this.handleStep1Next = this.handleStep1Next.bind(this);
        // this.handleTitlesNext = this.handleTitlesNext.bind(this);
        // this.handleIntrosNext = this.handleIntrosNext.bind(this);
        this.addListItem = this.addListItem.bind(this);
        this.updateListItem = this.updateListItem.bind(this);
        this.removeListItem = this.removeListItem.bind(this);
        this.handleAddMouseEnter = this.handleAddMouseEnter.bind(this);
        this.handleAddMouseLeave = this.handleAddMouseLeave.bind(this);
        this.errorCheck = this.errorCheck.bind(this);
        this.setErrorIds = this.setErrorIds.bind(this);
        this.stringifyListItems = this.stringifyListItems.bind(this);
    }

    // setAPIValue (key, value) {
    //     var current = this.state.values;
    //     current[key] = value;
    //     this.setState({ values: current });
    // }

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

    setErrorIds (ids) {
        this.setState({errorIds: ids});
    }

    errorCheck () {
        var ids = [];

        if (!('topic' in this.state.values) || this.state.values.topic.trim() == '') {
            ids.push('topic');
        }

        if (this.state.values.listitems[0].title.trim() == '') {
            ids.push('0.title');
        }
        if (this.state.values.listitems[0].summary.trim() == '') {
            ids.push('0.summary');
        }

        var completeItems = []; 
        this.state.values.listitems.forEach((item, index) => {
            if (item) {
                if (item.title.trim().length > 0 && item.summary.trim().length == 0) {
                    ids.push(index + '.summary');
                } else if (item.title.trim().length == 0 && item.summary.trim().length > 0) {
                    ids.push(index + '.title');
                } else if (item.title.trim().length > 0 && item.summary.trim().length > 0) {
                    completeItems.push(item)
                }
            }
        });

        return ids;
    }

    // handleStep1Next () {
    //     var ids = [];

    //     if (!('topic' in this.state.values) || this.state.values.topic.trim() == '') {
    //         ids.push('topic');
    //     }

    //     if (this.state.listitems[0].title.trim() == '') {
    //         ids.push('0.title');
    //     }
    //     if (this.state.listitems[0].summary.trim() == '') {
    //         ids.push('0.summary');
    //     }

    //     var completeItems = [];
    //     this.state.listitems.forEach((item, index) => {
    //         if (item) {
    //             if (item.title.trim().length > 0 && item.summary.trim().length == 0) {
    //                 ids.push(index + '.summary');
    //             } else if (item.title.trim().length == 0 && item.summary.trim().length > 0) {
    //                 ids.push(index + '.title');
    //             } else if (item.title.trim().length > 0 && item.summary.trim().length > 0) {
    //                 completeItems.push(item)
    //             }
    //         }
    //     });

    //     if (ids.length > 0) {
    //         this.setState({ errorMsg: 'Please fill out all required fields.', error: true, errorIds: ids });
    //     } else {
    //         this.setState({ errorMsg: '', error: false, errorIds: [], loading: true, listitems: completeItems });

    //         var apiProps = {
    //             type: 'list_article_title',
    //             topic: this.state.values.topic
    //         }
    //         createConent(apiProps).then(resp => {
    //             if (this.verifyResp(resp)) {
    //                 this.setState({ titles: resp.response, step: 2, loading: false });
    //             }
    //         }).catch((e) => {
    //             this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
    //         });
    //     }
    // }

    // handleTitlesNext () {
    //     if (!this.state.values.title || this.state.values.title.trim() == '') {
    //         this.setState({ errorMsg: 'Please select a title.', error: true });
    //     } else {
    //         this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

    //         var apiProps = {
    //             type: 'list_article_intro',
    //             research: false,
    //             title: this.state.values.title
    //         }

    //         createConent(apiProps).then(resp => {
    //             if (this.verifyResp(resp)) {
    //                 this.setState({ intros: resp.response, step: 3, loading: false });
    //             }
    //         }).catch((e) => {
    //             this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
    //         });
    //     }
    // }

    // handleIntrosNext () {
    //     if (!this.state.values.intro || this.state.values.intro.trim() == '') {
    //         this.setState({ errorMsg: 'Please select an intro.', error: true });
    //     } else {
    //         this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

    //         var items = {};
    //         this.state.listitems.forEach((item, index) => {
    //             items['1.' + (index+1)] = 'Title: ' + item.title + '\n' + 'Summary: ' + item.summary;
    //         });

    //         var apiProps = {
    //             type: 'list_article_fulltext',
    //             ...this.state.values,
    //             ...items
    //         }

    //         createConent(apiProps).then(resp => {
    //             if (this.verifyResp(resp)) {
    //                 this.setState({ fulltext: resp.response[0], step: 4, loading: false });
    //             }
    //         }).catch((e) => {
    //             this.setState({ errorMsg: 'An unkown error occured. Please try again.', error: true, loading: false });
    //         });
    //     }
    // }

    stringifyListItems (values) {
        var items = {};
        values.listitems.forEach((item, index) => {
            items['1.' + (index+1)] = 'Title: ' + item.title + '\n' + 'Summary: ' + item.summary;
        });
        values = {
            ...values,
            ...items
        }
        delete values.listitems;
        return values;
    }

    updateFormValues (e) {
        var current = this.state.values;
        current[e.target.id] = e.target.value;
        this.setState({ values: current });
    }

    updateValues (key, value) {
        var current = this.state.values;
        current[key] = value;
        this.setState({ values: current });
    }

    updateListItem (e) {
        const idx = e.target.id.split('.')[0];
        const type = e.target.id.split('.')[1];

        var current = this.state.values;
        current.listitems[idx][type] = e.target.value;
        this.setState({ values: current });
    }

    addListItem () {
        var len = 0;
        this.state.values.listitems.forEach(item => {
            if (item) {
                len++;
            }
        });

        if (len >= 5) {
            this.setState({ addWarn: true });
        } else {
            var values = this.state.values;
            values.listitems.push({ title: '', summary: '' });
            this.setState({ values: values });
        }
    }

    removeListItem (e) {
        var values = this.state.values;
        values.listitems[e.target.id] = false;
        this.setState({ values: values });
    }

    handleAddMouseEnter () {
        var len = 0;
        this.state.values.listitems.forEach(item => {
            if (item) {
                len++;
            }
        });

        if (len >= 5) {
            this.setState({ addWarn: true });
        }
    }

    handleAddMouseLeave () {
        this.setState({ addWarn: false });
    }

    render() {
        return (
            <StepContainer save={{name: this.state.name, type: 'list-blog', values: this.state.values}} setErrorIds={this.setErrorIds} updateValues={this.updateValues} updateName={(e) => this.setState({ name: e.target.value.trim() })} step={this.state.step}>
                <div step='1' title={this.props.pageName} next={{required: this.errorCheck, type: 'list_article_title', values: this.state.values, key: 'titles'}}>
                    <FormComponent
                        updateValue={this.updateFormValues}
                        value={this.state.values.topic}
                        errors={this.state.errorIds}
                        required={true}
                        inputId='topic'
                        title='Topic'
                        description='The topic you want your listicle to be about.'
                        type='text'
                        maxlength='40'
                        placeholder='e.g. top 5 writing tools'
                    />
                    <FormGroup>
                        <label className="form-control-label">
                            List Items
                        </label>
                        <p>Use the boxes below to enter a short title and description for each item you want included in your listicle.</p>
                    </FormGroup>
                    {this.state.values.listitems && this.state.values.listitems.map((item, index) =>
                        item ? 
                            <Card style={{ display: 'block', marginTop: '1.5em' }}>
                                <CardBody style={{ backgroundColor: '#f8f9fa' }}>
                                    {index > 0 ?
                                        <i className="ni ni-fat-remove" id={index} style={{ float: 'right', fontSize: '2em', cursor: 'pointer' }} onClick={this.removeListItem} />
                                    : null}
                                    <FormComponent
                                        updateValue={this.updateListItem}
                                        value={item.title}
                                        errors={this.state.errorIds}
                                        inputId={index + '.title'}
                                        title='Title'
                                        description='Enter a title for this list item.'
                                        type='text'
                                        maxlength='40'
                                        placeholder='e.g. Scribeo'
                                    />
                                    <FormComponent
                                        updateValue={this.updateListItem}
                                        value={item.summary}
                                        errors={this.state.errorIds}
                                        inputId={index + '.summary'}
                                        title='Description'
                                        description='Enter a short description/summary relating to the title. This will be expanded in the full blog post.'
                                        type='textarea'
                                        maxlength='200'
                                        placeholder="e.g. Scribeo uses AI to generate written content for businesses that's almost indistinguishable from human writers. Scibeo can write blog posts, emails, ad copy, website content, ideas, and more."
                                    />
                                </CardBody>
                            </Card>
                        : null
                    )}
                    <Popover
                        placement="right"
                        isOpen={this.state.addWarn}
                        target="add_btn"
                        className="popover-danger"
                    >
                        <PopoverBody>
                            Cannot add more than 5 list items.
                        </PopoverBody>
                    </Popover>
                    <Button id="add_btn" className="btn-icon btn-3" color="default" outline type="button" onClick={this.addListItem} style={{ marginTop: '1.5em' }} onMouseEnter={this.handleAddMouseEnter} onMouseLeave={this.handleAddMouseLeave}>
                        <span className="btn-inner--icon">
                            <i className="ni ni-fat-add" />
                        </span>
                        <span className="btn-inner--text">Add</span>
                    </Button>
                </div>
                <div step='2' next={{required: ['title'], type: 'list_article_intro', values: this.state.values, updateValues: this.updateValues, key: 'intros'}} title='Titles'>
                    <p>Select or edit your favorite title below.</p>
                    <Selector choices={this.state.values.titles} key={this.state.values.titles} selected={this.state.values.title} handleSelect={(text) => this.updateValues('title', text)} handleDeselect={() => this.updateValues('title', '')} />
                </div>
                <div step='3' next={{required: ['intro'], type: 'list_article_fulltext', values: this.state.values, updateValues: this.updateValues, key: 'fulltext', preProcess: this.stringifyListItems}} title='Introductions'>
                    <p>Select or edit your favorite intro below.</p>
                    <Selector choices={this.state.values.intros} key={this.state.values.intros} selected={this.state.values.intro} handleSelect={(text) => this.updateValues('intro', text)} handleDeselect={() => this.updateValues('intro', '')} />
                </div>
                <div step='4' title='Full Blog Post'>
                    <p>Edit and copy your blog post below.</p>
                    <RichTextEditor key={this.state.values.intro + '\n' + this.state.values.fulltext} text={this.state.values.intro + '\n' + this.state.values.fulltext} />
                </div>
            </StepContainer>
        );
    }
}

export default ListBlogComponent;
