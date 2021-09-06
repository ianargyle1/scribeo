import React from "react";

// reactstrap components
import {
  Input,
  FormGroup,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: [],
            chk: this.props.value,
            characters: this.props.value ? this.props.value.length : 0,
            dropdownOpen: false
        }

        if (this.props.type == 'dropdown') {
            this.props.updateValue({ target: { id: this.props.inputId, value: this.props.options[0] } });
        }

        this.updateKeywords = this.updateKeywords.bind(this);
        this.updateKeywordsKeypress = this.updateKeywordsKeypress.bind(this);
        this.deleteKeyword = this.deleteKeyword.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleChk = this.toggleChk.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    updateKeywords (e) {
        const str = String(e.target.value);
        if (str[str.length-1] == ',') {
            this.props.updateValue({
                target: {
                    id: this.props.inputId,
                    value: this.state.keywords.concat(str.substring(0, str.length-1))
                }
            });
            this.setState({ keywords: this.state.keywords.concat(str.substring(0, str.length-1)) });
            e.target.value = '';
        }
    }

    updateKeywordsKeypress (e) {
        const str = String(e.target.value);
        if(e.key === 'Enter') {
            e.preventDefault();
            this.props.updateValue({
                target: {
                    id: this.props.inputId,
                    value: this.state.keywords.concat(str)
                }
            });
            this.setState({ keywords: this.state.keywords.concat(str) });
            e.target.value = '';
        }
    }

    deleteKeyword (keyword) {
        var keywords = [...this.state.keywords];
        var idx = this.state.keywords.indexOf(keyword);
        if (idx != -1) {
            keywords.splice(idx, 1);
            this.props.updateValue({
                target: {
                    id: this.props.inputId,
                    value: keywords
                }
            });
            this.setState({ keywords: keywords });
        }
    }

    toggle () {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    toggleChk () {
        this.props.updateValue({
            target: {
                id: this.props.inputId,
                value: !this.state.chk
            }
        });
        this.setState({ chk: !this.state.chk });
    }

    updateValue (e) {
        this.props.updateValue(e);
        this.setState({ characters: e.target.value.length });
    }

    render() {
        return (
            <FormGroup>
                {this.props.title ?
                    <label
                        className="form-control-label"
                    >
                        {this.props.title}
                    </label>
                : null}
                {this.props.description ?
                    <p>{this.props.description}</p>
                : null}
                {this.props.type == 'text' || this.props.type == 'textarea' ?
                    <>
                        <Input
                            className="form-control-alternative"
                            id={this.props.inputId}
                            placeholder={'placeholder' in this.props ? this.props.placeholder : null}
                            rows={'rows' in this.props ? this.props.rows : null}
                            type={this.props.type}
                            onChange={this.updateValue}
                            disabled={this.props.disabled}
                            style={this.props.errors ? this.props.errors.includes(this.props.inputId) ? {border: '1px solid red'} : {} : {}}
                            maxlength={this.props.maxlength}
                            value={this.props.value}
                        />
                        <p style={{ float: 'right', fontSize: '.8em', color: this.state.characters == this.props.maxlength ? 'red' : null }}>{this.state.characters}/{this.props.maxlength}</p>
                    </>
                : this.props.type == 'checkbox' ?
                    <>
                        <input
                            className="form-check-input"
                            id={this.props.inputId}
                            type="checkbox"
                            checked={this.state.chk}
                            onChange={this.toggleChk}
                            disabled={this.props.disabled}
                            style={this.props.errors.includes(this.props.inputId) ? {border: '1px solid red', marginLeft: '0'} : { marginLeft: '0' }}
                        />
                        <label className="form-check-label" for={this.props.inputId} style={{ marginLeft: '1.25rem' }}>
                            {this.props.label}
                        </label>
                    </>
                : this.props.type == 'dropdown' ?
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            {this.props.value ? this.props.value : this.props.options[0]}
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.props.options.map(option => 
                                <DropdownItem onClick={() => this.updateValue({ target: { id: this.props.inputId, value: option } })}>{option}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                : this.props.type == 'keywords' ?
                    <>
                        <Input
                            id={this.props.inputId}
                            className="form-control-alternative"
                            placeholder={'placeholder' in this.props ? this.props.placeholder : null}
                            type="text"
                            onChange={this.updateKeywords}
                            onKeyPress={this.updateKeywordsKeypress}
                            disabled={this.props.disabled || this.state.keywords.length >= 5}
                            style={this.props.errors.includes(this.props.inputId) ? {border: '1px solid red'} : {}}
                            maxlength={this.props.maxlength}
                        />
                        <p style={{ float: 'right', fontSize: '.8em', color: this.state.characters == this.props.maxlength ? 'red' : null }}>{this.state.characters}/{this.props.maxlength}</p>
                        {this.state.keywords.length >= 5 ?
                            <p style={{ color: 'red', marginBottom: '0' }}>5 keywords is the max. If you'd like to add more please remove a keyword.</p>
                        : null}
                        { this.state.keywords.map((keyword) => 
                        <Card className="text-white bg-primary p-1 mt-2 mr-2" style={{ display: 'inline-block' }}>
                            {keyword}
                            <i className="ni ni-fat-remove align-middle ml-1" onClick={() => this.deleteKeyword(keyword)}></i>
                        </Card>) }
                    </>
                : null}
                {this.props.children}
            </FormGroup>
        );
    }
}

export default FormComponent;