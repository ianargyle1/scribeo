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
  Col
} from "reactstrap";

import EditCard from '../Components/editCard'
import SelectionCard from '../Components/selectionCard'
import { createConent } from "../../../utils/createContent";
import "../../../assets/vendor/nucleo/css/nucleo.css";

const article_types = ['News', 'Information', 'How-To', 'Sales'];
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
var article_props = {};

function validate(requiredParams, req) {
    if (Object.keys(requiredParams).length == 0) {
        return '{true}';
    }
    for (const param in requiredParams) {
        if (param[0] == '|' && param[param.length-1] == '|') {
            const command = param.slice(0, -1).slice(1).split('=');
            var chk;
            if (req[command[0]] != undefined) {
                if (command[1] == 'true') {
                    chk = true;
                } else if (command[1] == 'false') {
                    chk = false;
                } else {
                    chk = command[1];
                }
                if (req[command[0]] == chk) {
                    const result = validate(requiredParams[param], req);
                    if (result != '{true}') {
                        return result;
                    }
                }
            } else {
                return command[0];
            }
        } else if (req[param] == undefined) {
            return param;
        } else if (typeof requiredParams[param] == 'string') {
            const type = requiredParams[param].slice(0, -1).slice(1);
            if (typeof req[param] != type) {
                return param;
            }
        } else {
            const result = validate(requiredParams[param], req[param])
            if (result != '{true}') {
                return result;
            }
        }
    }
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
          step: -1,
          articleType: '',
          choices: []
        }

        this.goToStep2 = this.goToStep2.bind(this);
        this.goToStep3 = this.goToStep3.bind(this);
        this.goToStep4 = this.goToStep4.bind(this);
        this.updateType = this.updateType.bind(this);
        this.updateResearch = this.updateResearch.bind(this);
        this.toggleMoreOpt = this.toggleMoreOpt.bind(this);
        this.updateKeywords = this.updateKeywords.bind(this);
        this.updateKeywordsKeypress = this.updateKeywordsKeypress.bind(this);
        this.deleteKeyword = this.deleteKeyword.bind(this);
        this.updateArticleProps = this.updateArticleProps.bind(this);
    }

    goToStep2 (e) {
        e.preventDefault();

        // Check for missing props
        const result = validate(required_props_step_1, article_props);
        if (result != '{true}') {
            this.setState({ errorMsg: 'Please fill out required fields.', errorIds: result, error: true });
        } else {
            this.setState({ error: false, step: -2, formDisabled: true });

            console.log(article_props);

            var serverProps = {
                type: 'article_step_1',
                articleProps: article_props,
                cascade: false
            }

            createConent(serverProps).then(resp => {
                this.setState({ choices: resp.choices, step: 2, formDisabled: false });
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

    render() {
        return (
        <Container style={{maxWidth: '100%'}}>
            <Row className="justify-content-center">
                <Col xs={12} md={10} xl={6} className="mb-3">
                    <Card className="shadow">
                        {this.state.step > 0 ?
                            <CardHeader className="bg-transparent border-0">
                                <h4 className="mb-0 mr-3" style={{ display: 'inline-block', color: this.state.step == 1 ? '#5c5c5c' : '#bababa' }}>Step 1</h4>
                                <h4 className="mb-0 mr-3" style={{ display: 'inline-block', color: this.state.step == 2 ? '#5c5c5c' : '#bababa' }}>Step 2</h4>
                                <h4 className="mb-0 mr-3" style={{ display: 'inline-block', color: this.state.step == 3 ? '#5c5c5c' : '#bababa' }}>Step 3</h4>
                            </CardHeader>
                        : null}
                        {this.state.step == -1 ?
                            <CardBody align="center">
                                <h4 className="mb-2">What do you want to write?</h4>
                                <div className="w-50">
                                    {article_types.map((type) =>
                                        <SelectionCard text={type} handleSelect={this.updateType} />
                                    )}
                                </div>
                            </CardBody>
                        : this.state.step == 0 ?
                            <CardBody align="center">
                                <h4 className="mb-2">Should we research the topic?</h4>
                                <p>Select yes if you want our AI to research your topic. This generaly results in better articles but will increase loading time slightly.</p>
                                <SelectionCard text={'Yes'} handleSelect={this.updateResearch} />
                                <SelectionCard text={'No'} handleSelect={this.updateResearch} />
                            </CardBody>
                        : this.state.step == 1 ?
                            <CardBody>
                                <Form role="form">
                                    <div className="pl-lg-4">
                                        { this.state.articleType == 'News' ?
                                            this.state.research ?
                                                <>
                                                     <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                        >
                                                            Topic
                                                        </label>
                                                        <p>What do you want to write about?</p>
                                                        <Input
                                                            id="topic"
                                                            className="form-control-alternative"
                                                            placeholder='e.g. 2021 United Airlines Supersonic Jets Deal'
                                                            type="text"
                                                            style={ this.state.errorIds['topic'] && this.state.error ? {border: '1px solid red'} : {} }
                                                            onChange={this.updateArticleProps}
                                                            disabled={this.state.formDisabled}
                                                        />
                                                    </FormGroup>
                                                </>
                                            :
                                                <>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                        >
                                                            What's Happened?
                                                        </label>
                                                        <p>Briefly, try to include the who, what, where, why, when, and how of your story (as appropriate)</p>
                                                        <Input
                                                            id="newsBrief"
                                                            className="form-control-alternative"
                                                            placeholder='e.g. On June 3, 2021 United Airlines announced a deal with Boom Supersonic to build 15 new supersonic "Overture" jets capable of twice the speed of regular passenger jets.'
                                                            rows="2"
                                                            type="textarea"
                                                            style={ this.state.errorIds['newsBrief'] && this.state.error ? {border: '1px solid red'} : {} }
                                                            onChange={this.updateArticleProps}
                                                            disabled={this.state.formDisabled}
                                                        />
                                                    </FormGroup>
                                                </>
                                        : null }
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
                                                { this.state.articleType == 'News' ?
                                                    <>
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                            >
                                                                Extra Sources
                                                            </label>
                                                            <p>Our AI will search for sources, but you can include specific ones here. Seperate each source with a new line or space.</p>
                                                            <Input
                                                                id="sources"
                                                                className="form-control-alternative"
                                                                placeholder={"e.g. https://www.usatoday.com/story/travel/airline-news/2021/06/03/united-airlines-concorde-like-supersonic-jet-halve-travel-time/7520768002/\nhttps://www.nytimes.com/2021/06/03/business/economy/united-airlines-supersonic-planes.html"}
                                                                rows="4"
                                                                type="textarea"
                                                                onChange={this.updateArticleProps}
                                                                disabled={this.state.formDisabled}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                            >
                                                                Relevant Facts
                                                            </label>
                                                            <p>Facts/claims relevant to your story.</p>
                                                            <Input
                                                                id="facts"
                                                                className="form-control-alternative"
                                                                placeholder="e.g. The jets are capable of a top speed of mach 1.7. Oveture jets run on 100% sustainable fuel. The jets won't be introduced until 2025 and the first passangers won't board until 2029."
                                                                rows="4"
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
                                                                rows="4"
                                                                type="textarea"
                                                                onChange={this.updateArticleProps}
                                                                disabled={this.state.formDisabled}
                                                            />
                                                        </FormGroup>
                                                    </>
                                                : null }
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
                                    </div>
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
                                                    onClick={this.goToStep2}
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

//export default GeneralBlogComponent;
