import React from "react";

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
import "../../../assets/vendor/nucleo/css/nucleo.css";

var article_props = {};

const required_props_step_1 = { 
    'type': '/string/', 
    'research':'/boolean/',
    '|research=true|': {
        '|type=News|': {
            'topic':'/string/'
        }
    },
    '|research=false|': {
        '|type=News|': {
            'newsBrief':'/string/'
        }
    }
};
// const required_props_step_1 = {'News': ['newsBrief']}
const required_props_step_2 = {'News': ['title', 'newsBrief']}

function validate(requiredParams, req) {
    return '{true}';
}

class GeneralBlogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          errorMsg: 'Please fill out required fields.',
          errorIds: {},
          error: false,
          moreOpt: false,
          formDisabled: false,
          keywords: [],
          step: 1,
          articleType: '',
          choices: [],
          research: false,
          researchInfo: false,
          branded: false
        }

        this.step2 = this.step2.bind(this);
        this.goToStep3 = this.goToStep3.bind(this);
        this.goToStep4 = this.goToStep4.bind(this);
        this.updateType = this.updateType.bind(this);
        this.updateResearch = this.updateResearch.bind(this);
        this.toggleMoreOpt = this.toggleMoreOpt.bind(this);
        this.updateKeywords = this.updateKeywords.bind(this);
        this.updateKeywordsKeypress = this.updateKeywordsKeypress.bind(this);
        this.deleteKeyword = this.deleteKeyword.bind(this);
        this.updateArticleProps = this.updateArticleProps.bind(this);
        this.toggleBranded = this.toggleBranded.bind(this);
        this.toggleResearch = this.toggleResearch.bind(this);
        this.handleResearchMouseEnter = this.handleResearchMouseEnter.bind(this);
        this.handleResearchMouseLeave = this.handleResearchMouseLeave.bind(this);
    }

    step2 (e) {
        e.preventDefault();

        // Check for missing props
        var error = false;
        var errIds = {};
        if (!this.state.research && (!article_props.summary || article_props.summary.trim().length <= 0)) {
            errIds['summary'] = true;
            error = true;
        }
        if (this.state.research && (!article_props.topic || article_props.topic.trim().length <= 0)) {
            errIds['topic'] = true;
            error = true;
        }
        if (this.state.branded && (!article_props.product || article_props.product.trim().length <= 0)) {
            errIds['product'] = true;
            error = true;
        }
        if (this.state.branded && (!article_props.description || article_props.description.trim().length <= 0)) {
            errIds['description'] = true;
            error = true;
        }
        if (error) {
            this.setState({ errorMsg: 'Please fill out required fields.', errorIds: errIds, error: true });
        } else {
            this.setState({ error: false, step: -2, formDisabled: true });

            console.log(article_props);

            var serverProps = {};

            if (this.state.research) {
                serverProps.type = 'article_sources'
            } else {
                serverProps.type = 'info_article_title'
            }

            for (const property in article_props) {
                serverProps[property] = article_props[property]
            }

            createConent(serverProps).then(resp => {
                this.setState({ choices: resp.response, step: 2, formDisabled: false });
            });
        }
    }

    goToStep3 (text) {
        article_props.title = text;

        // Check for missing props
        var err = false;
        var errIds = this.state.errorIds;
        for (var i = 0; i < required_props_step_2[this.state.articleType].length; i++) {
            if (!article_props[required_props_step_2[this.state.articleType][i]]) {
                errIds[required_props_step_2[this.state.articleType][i]] = true;
                err = true;
            } else {
                errIds[required_props_step_2[this.state.articleType][i]] = false;
            }
        }
        if (err) {
            this.setState({ errorMsg: 'Please fill out required fields.', errorIds: errIds, error: true });
        } else {
            this.setState({ error: false, step: -2, formDisabled: true });

            console.log(article_props);

            var serverProps = {
                type: 'article_step_2',
                articleProps: article_props,
            }

            createConent(serverProps).then(resp => {
                this.setState({ choices: resp.choices, step: 3, formDisabled: false });
            });
        }
    }

    goToStep4 (text) {
        // Do something
    }

    updateType (type) {
        article_props['type'] = type;
        this.setState({ articleType: type, step: 0 });
    }

    updateResearch (selection) {
        if (selection == 'Yes') {
            article_props['research'] = true;
            this.setState({ research: true, step: 1 })
        } else {
            article_props['research'] = false;
            this.setState({ research: false, step: 1 })
        }
    }

    updateArticleProps (e) {
        const id = e.target.id;
        const data = e.target.value.trim();
        article_props[id] = data;
    }

    updateKeywords (e) {
        const str = String(e.target.value);
        if (str[str.length-1] == ',') {
            this.setState({ keywords: this.state.keywords.concat(str.substring(0, str.length-1)) });
            article_props.keywords = this.state.keywords.concat(str.substring(0, str.length-1))
            e.target.value = '';
        }
    }

    updateKeywordsKeypress (e) {
        const str = String(e.target.value);
        if(e.key === 'Enter') {
            e.preventDefault();
            this.setState({ keywords: this.state.keywords.concat(str) });
            e.target.value = '';
        }
    }

    deleteKeyword (keyword) {
        var keywords = [...this.state.keywords];
        var idx = this.state.keywords.indexOf(keyword);
        if (idx != -1) {
            keywords.splice(idx, 1);
            this.setState({ keywords: keywords });
        }
    }

    toggleMoreOpt (e) {
        e.preventDefault();
        this.setState({ moreOpt: !this.state.moreOpt });
    }

    toggleBranded () {
        this.setState({ branded: !this.state.branded });
    }

    toggleResearch () {
        this.setState({ research: !this.state.research });
    }

    handleResearchMouseEnter () {
        this.setState({ researchInfo: true });
    }

    handleResearchMouseLeave () {
        this.setState({ researchInfo: false });
    }

    render() {
        return (
        <Container style={{maxWidth: '100%'}}>
            <Row className="justify-content-center">
                <Col xs={12} md={10} xl={6} className="mb-3">
                    <Card className="shadow">
                        {this.state.step == 1 ?
                            <CardBody>
                                <Form role="form">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                        >
                                            Include Your Brand
                                        </label>
                                        <p>Check the box below to include your product or brand in the blog post for content marketing purposes.</p>
                                        <input
                                            className="form-check-input"
                                            id="branded"
                                            type="checkbox"
                                            checked={this.state.branded}
                                            onChange={this.toggleBranded}
                                            style={{ marginLeft: '0' }}
                                        />
                                        <label className="form-check-label" for="branded" style={{ marginLeft: '1.25rem' }}>
                                            Include Your Brand
                                        </label>
                                    </FormGroup>
                                    {this.state.branded ?
                                        <>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                >
                                                    Product Name
                                                </label>
                                                <p>Enter the name of the product or service you'd like to be included in post.</p>
                                                <Input
                                                    id="product"
                                                    className="form-control-alternative"
                                                    placeholder='e.g. United Airlines supersonic passanger jets'
                                                    type="text"
                                                    style={ this.state.errorIds['product'] && this.state.error ? {border: '1px solid red'} : {} }
                                                    onChange={this.updateArticleProps}
                                                    disabled={this.state.formDisabled}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                >
                                                    Product description
                                                </label>
                                                <p>Enter a description of the product or service entered above.</p>
                                                <Input
                                                    id="description"
                                                    className="form-control-alternative"
                                                    placeholder='e.g. United Airlines supersonic passanger jets'
                                                    rows="2"
                                                    type="textarea"
                                                    style={ this.state.errorIds['description'] && this.state.error ? {border: '1px solid red'} : {} }
                                                    onChange={this.updateArticleProps}
                                                    disabled={this.state.formDisabled}
                                                />
                                            </FormGroup>
                                        </>
                                    : null }
                                    {this.state.research ?
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                            >
                                                Topic
                                            </label>
                                            <p>Enter the topic you'd like to write about.</p>
                                            <Input
                                                id="topic"
                                                className="form-control-alternative"
                                                placeholder='e.g. United Airlines supersonic passanger jets'
                                                type="text"
                                                style={ this.state.errorIds['topic'] && this.state.error ? {border: '1px solid red'} : {} }
                                                onChange={this.updateArticleProps}
                                                disabled={this.state.formDisabled}
                                            />
                                        </FormGroup>
                                    :
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                            >
                                                Brief Summary
                                            </label>
                                            <p>Try to include all the information needed to write your post. If you can't fit everything here, check out the "more options" section below.</p>
                                            <Input
                                                id="summary"
                                                className="form-control-alternative"
                                                placeholder='e.g. On June 3, 2021 United Airlines announced a deal with Boom Supersonic to build 15 new supersonic "Overture" jets capable of twice the speed of regular passenger jets.'
                                                rows="2"
                                                type="textarea"
                                                style={ this.state.errorIds['summary'] && this.state.error ? {border: '1px solid red'} : {} }
                                                onClick={this.updateArticleProps}
                                                disabled={this.state.formDisabled}
                                            />
                                        </FormGroup>
                                    }
                                    <FormGroup>
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
                                        <input
                                            className="form-check-input"
                                            id="research"
                                            type="checkbox"
                                            checked={this.state.research}
                                            onChange={this.toggleResearch}
                                            style={{ marginLeft: '0' }}
                                        />
                                        <label className="form-check-label" for="research" style={{ marginLeft: '1.25rem' }}>
                                            Include Research <img src={require("../../../images/info_icon.png").default} id='research_info_icon' style={{ verticalAlign: 'middle', width: '1.25em', opacity: '0.6' }} onMouseEnter={this.handleResearchMouseEnter} onMouseLeave={this.handleResearchMouseLeave} />
                                        </label>
                                    </FormGroup>
                                    <FormGroup>
                                        <div style={{ cursor: 'pointer' }} onClick={this.toggleMoreOpt}>
                                            <label
                                                className="form-control-label mr-2"
                                            >
                                                More Options
                                            </label>
                                            { this.state.moreOpt ?
                                            <i className="ni ni-bold-down align-middle"></i>
                                            : <i className="ni ni-bold-right align-middle"></i> }
                                        </div>
                                    </FormGroup>
                                    { this.state.moreOpt ? 
                                        <>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                >
                                                    Title
                                                </label>
                                                <p>The title of your post. If this is left blank one will be generated for you.</p>
                                                <Input
                                                    id="title"
                                                    className="form-control-alternative"
                                                    placeholder={"e.g. New York to London in 3 1/2 hours? United says it\'ll be possible with new supersonic jet"}
                                                    type="text"
                                                    onChange={this.updateArticleProps}
                                                    disabled={this.state.formDisabled}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                >
                                                    Introduction
                                                </label>
                                                <p>The first one or two sentences of the post. If this is left blank the intro will be generated for you.</p>
                                                <Input
                                                    id="intro"
                                                    className="form-control-alternative"
                                                    placeholder={"e.g. United Airlines announced a deal to buy 15 supersonic jets, planning to carry passengers on the ultra-fast planes by 2029. If the airline can follow through with its plan, these would be the first commercial supersonic flights since the grounding of the Concorde."}
                                                    rows="3"
                                                    type="textarea"
                                                    onChange={this.updateArticleProps}
                                                    disabled={this.state.formDisabled}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                >
                                                    Extra Information
                                                </label>
                                                <p>Any information that's important for your blog posts but isn't included in the summary.</p>
                                                <Input
                                                    id="info"
                                                    className="form-control-alternative"
                                                    placeholder={"e.g. The jets are capable of a top speed of mach 1.7.\nOveture jets run on 100% sustainable fuel.\nThe jets won't be introduced until 2025 and the first passangers won't board until 2029."}
                                                    rows="3"
                                                    type="textarea"
                                                    onChange={this.updateArticleProps}
                                                    disabled={this.state.formDisabled}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                >
                                                    Quotes
                                                </label>
                                                <p>Quotes you want included in the article. Inlude the quote and who it's from.</p>
                                                <Input
                                                    id="quotes"
                                                    className="form-control-alternative"
                                                    placeholder={`e.g. "United continues on its trajectory to build a more innovative, sustainable airline and today's advancements in technology are making it more viable for that to include supersonic planes," United CEO Scott Kirby`}
                                                    rows="3"
                                                    type="textarea"
                                                    onChange={this.updateArticleProps}
                                                    disabled={this.state.formDisabled}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                >
                                                    Keywords
                                                </label>
                                                <Input
                                                    id="keywords"
                                                    className="form-control-alternative"
                                                    placeholder="e.g. overture, concord, supersonic jets, United Airlines"
                                                    type="text"
                                                    onChange={this.updateKeywords}
                                                    onKeyPress={this.updateKeywordsKeypress}
                                                    disabled={this.state.formDisabled}
                                                />
                                                { this.state.keywords.map((keyword) => 
                                                <Card className="text-white bg-primary p-1 mt-2 mr-2" style={{ display: 'inline-block' }}>
                                                    {keyword}
                                                    <i className="ni ni-fat-remove align-middle ml-1" onClick={() => this.deleteKeyword(keyword)}></i>
                                                </Card>) }
                                            </FormGroup>
                                        </>
                                    : null }
                                    <Row>
                                        { this.state.error ? 
                                        <Col className="align-middle">
                                            <Alert color="danger" className="mb-0 mt-4">
                                                <strong>Error.</strong> {this.state.errorMsg}
                                            </Alert>
                                        </Col>
                                        : null }
                                        <Col>
                                            <div className="text-right">
                                                <Button
                                                    className="my-4"
                                                    color="primary"
                                                    type="button"
                                                    onClick={this.generateTitles}
                                                    disabled={this.state.formDisabled}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        : this.state.step == 2 ?
                            <CardBody>
                                <p>Select or edit your favorite title below.</p>
                                {this.state.choices.map((choice) =>
                                    <EditCard text={choice} handleSelect={this.goToStep3} />
                                )}
                            </CardBody>
                        : this.state.step == 3 ?
                            <CardBody>
                                <p>Select or edit your favorite intro below.</p>
                                {this.state.choices.map((choice) =>
                                    <EditCard text={choice} handleSelect={this.goToStep4} />
                                )}
                            </CardBody>
                        : this.state.step == -2 ?
                            <img
                                alt="..."
                                className="img-center img-fluid"
                                src={require("../../../images/1493.gif").default}
                            />
                        : null}
                    </Card>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default GeneralBlogComponent;
