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
            listitems: [{ title: '', summary: '' }],
            values: {},
            titles: [],
            topic: '',
            title: '',
            intro: '',
            error: false,
            errorMsg: '',
            errorIds: [],
            loading: false,
            addWarn: false
        }

        this.setAPIValue = this.setAPIValue.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleStep1Next = this.handleStep1Next.bind(this);
        this.handleTitlesNext = this.handleTitlesNext.bind(this);
        this.handleIntrosNext = this.handleIntrosNext.bind(this);
        this.addListItem = this.addListItem.bind(this);
        this.updateListItem = this.updateListItem.bind(this);
        this.removeListItem = this.removeListItem.bind(this);
        this.handleAddMouseEnter = this.handleAddMouseEnter.bind(this);
        this.handleAddMouseLeave = this.handleAddMouseLeave.bind(this);
    }

    setAPIValue (key, value) {
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
        var ids = [];

        if (!('topic' in this.state.values) || this.state.values.topic.trim() == '') {
            ids.push('topic');
        }

        if (this.state.listitems[0].title.trim() == '') {
            ids.push('0.title');
        }
        if (this.state.listitems[0].summary.trim() == '') {
            ids.push('0.summary');
        }

        var completeItems = [];
        this.state.listitems.forEach((item, index) => {
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

        if (ids.length > 0) {
            this.setState({ errorMsg: 'Please fill out all required fields.', error: true, errorIds: ids });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true, listitems: completeItems });

            var apiProps = {
                type: 'list_article_title',
                topic: this.state.values.topic
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

    handleTitlesNext () {
        if (!this.state.values.title || this.state.values.title.trim() == '') {
            this.setState({ errorMsg: 'Please select a title.', error: true });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var apiProps = {
                type: 'list_article_intro',
                research: false,
                title: this.state.values.title
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

    handleIntrosNext () {
        if (!this.state.values.intro || this.state.values.intro.trim() == '') {
            this.setState({ errorMsg: 'Please select an intro.', error: true });
        } else {
            this.setState({ errorMsg: '', error: false, errorIds: [], loading: true });

            var items = {};
            this.state.listitems.forEach((item, index) => {
                items['1.' + (index+1)] = 'Title: ' + item.title + '\n' + 'Summary: ' + item.summary;
            });

            var apiProps = {
                type: 'list_article_fulltext',
                ...this.state.values,
                ...items
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

    updateItem (e) {
        var current = this.state.values;
        current[e.target.id] = e.target.value;
        this.setState({ values: current });
    }

    updateListItem (e) {
        const idx = e.target.id.split('.')[0];
        const type = e.target.id.split('.')[1];

        var newlistitems = this.state.listitems;
        newlistitems[idx][type] = e.target.value;
        this.setState({ listitems: newlistitems });
    }

    addListItem () {
        var len = 0;
        this.state.listitems.forEach(item => {
            if (item) {
                len++;
            }
        });

        if (len >= 5) {
            this.setState({ addWarn: true });
        } else {
            var newlistitems = this.state.listitems;
            newlistitems.push({ title: '', summary: '' });
            this.setState({ listitems: newlistitems });
        }
    }

    removeListItem (e) {
        var newlistitems = this.state.listitems;
        newlistitems[e.target.id] = false;
        console.log(e.target.id)
        this.setState({ listitems: newlistitems });
    }

    handleAddMouseEnter () {
        var len = 0;
        this.state.listitems.forEach(item => {
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
            <StepContainer step={this.state.step} disabled={false} error={this.state.error} errorMsg={this.state.errorMsg} loading={this.state.loading} handleBack={this.handleBack} >
                <div step='1' handleNext={this.handleStep1Next} title={this.props.pageName}>
                    <FormComponent
                        updateValue={this.updateItem}
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
                    {this.state.listitems.map((item, index) =>
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
                <div step='2' handleNext={this.handleTitlesNext} reloadHandler={this.handleStep1Next} title='Titles'>
                    <p>Select or edit your favorite title below.</p>
                    <Selector choices={this.state.titles} key={this.state.titles} selected={this.state.values.title} handleSelect={(text) => this.setAPIValue('title', text)} handleDeselect={() => this.setAPIValue('title', '')} />
                </div>
                <div step='3' handleNext={this.handleIntrosNext} reloadHandler={this.handleTitlesNext} title='Introductions'>
                    <p>Select or edit your favorite intro below.</p>
                    <Selector choices={this.state.intros} key={this.state.intros} selected={this.state.values.intro} handleSelect={(text) => this.setAPIValue('intro', text)} handleDeselect={() => this.setAPIValue('intro', '')} />
                </div>
                <div step='4' reloadHandler={this.handleIntrosNext} title='Full Blog Post'>
                    <p>Edit and copy your blog post below.</p>
                    <RichTextEditor key={this.state.values.intro + '\n' + this.state.fulltext} text={this.state.values.intro + '\n' + this.state.fulltext} />
                </div>
            </StepContainer>
        );
    }
}

export default ListBlogComponent;
