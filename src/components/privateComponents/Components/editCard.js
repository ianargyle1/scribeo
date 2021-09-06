import React from "react";

import {
    Card,
    Input,
    CardBody
  } from "reactstrap";

class EditCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            editText: 'Edit',
            color: '#f8f9fa',
            selected: false,
            text: this.props.text,
            newText: this.props.text
        }
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.updateText = this.updateText.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    handleSelect (e) {
        if (this.props.selected) {
            this.props.handleDeselect();
        } else {
            if (this.state.edit) {
                if (this.state.newText == '' && this.state.text.trim() != '') {
                    this.props.handleSelect(this.state.text, this.props.index);
                    this.setState({ edit: false, editText: 'Edit' });
                } else {
                    this.props.handleSelect(this.state.newText, this.props.index);
                    this.setState({ edit: false, editText: 'Edit', text: this.state.newText });
                }
            } else {
                this.props.handleSelect(this.state.text, this.props.index);
            }
        }
    }

    handleMouseEnter (e) {
        this.setState({ color: '#f2f2f2' });
    }

    handleMouseLeave (e) {
        this.setState({ color: '#f8f9fa' });
    }

    updateText (e) {
        this.setState({ newText: e.target.value.trim() });
    }

    toggleEdit (e) {
        e.stopPropagation();
        if (this.state.edit) {
            if (this.state.newText == '' && this.state.text.trim() != '') {
                this.setState({ edit: false, editText: 'Edit' });
            } else {
                this.props.onChange(this.state.newText, this.props.index);
                this.setState({ edit: false, editText: 'Edit', text: this.state.newText });
            }
        } else {
            this.setState({ edit: true, editText: 'Save' });
        }
    }

    render() {
        return (
            <>
                <Card className='mb-3' style={{ borderStyle: 'none' }} onClick={this.handleSelect} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <CardBody className="p-3" style={{ backgroundColor: (this.props.selected ? '#dedede' : this.state.color) }}>
                        {this.state.edit ? 
                        <Input
                            onClick={(e) => { e.stopPropagation() }}
                            className="form-control-alternative"
                            defaultValue={this.state.text}
                            onChange={this.updateText}
                            rows="2"
                            type="textarea"
                        />
                        : <p className="mb-0">{this.state.text}</p> }
                        <p style={{ float: 'right', color: '#5e72e4', cursor: 'pointer' }} className="mb-0" onClick={this.toggleEdit}>{this.state.editText}</p>
                    </CardBody>
                </Card>
            </>
        );
    }
}

export default EditCard;
