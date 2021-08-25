import React from "react";

import {
    Card,
    Input,
    CardBody
  } from "reactstrap";

class MultiEditCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            editText: 'Edit',
            color: '#f8f9fa',
            selected: false,
            components: this.props.components,
            newComponents: this.props.components,
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
                var newComponents = this.state.newComponents;
                for (var i = 0; i < newComponents.length; i++) {
                    if (newComponents[i].text.trim() == '') {
                        newComponents[i].text = this.state.components[i].text;
                    }
                }
                this.props.handleSelect(newComponents, this.props.index);
                this.setState({ edit: false, editText: 'Edit', components: newComponents });
            } else {
                this.props.handleSelect(this.state.components, this.props.index);
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
        var newComponents = this.state.newComponents;
        for (var i = 0; i < newComponents.length; i++) {
            if (newComponents[i].title == e.target.title) {
                newComponents[i].text = e.target.value;
                break;
            }
        }
        this.setState({ newComponents: newComponents });
    }

    toggleEdit (e) {
        e.stopPropagation();
        if (this.state.edit) {
            var newComponents = this.state.newComponents;
            for (var i = 0; i < newComponents.length; i++) {
                if (newComponents[i].text.trim() == '') {
                    newComponents[i].text = this.state.components[i].text;
                }
            }
            this.props.handleSelect(newComponents, this.props.index);
            this.setState({ edit: false, editText: 'Edit', components: newComponents });
        } else {
            this.setState({ edit: true, editText: 'Save' });
        }
    }

    render() {
        return (
            <>
                <Card className='mb-3' style={{ borderStyle: 'none' }} onClick={this.handleSelect} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <CardBody className="p-3" style={{ backgroundColor: (this.props.selected ? '#dedede' : this.state.color) }}>
                        {this.state.components.map(component => 
                            <>
                                <p style={{ fontSize: '1.5em', fontWeight: '600' }}>{component.title}</p>
                                {this.state.edit ? 
                                    <Input
                                        id={component.title}
                                        onClick={(e) => { e.stopPropagation() }}
                                        className="form-control-alternative"
                                        defaultValue={component.text}
                                        onChange={this.updateText}
                                        rows="2"
                                        type="textarea"
                                    />
                                : <p className="mb-0">{component.text}</p> }
                            </>    
                        )}
                        <p style={{ float: 'right', color: '#5e72e4', cursor: 'pointer' }} className="mb-0" onClick={this.toggleEdit}>{this.state.editText}</p>
                    </CardBody>
                </Card>
            </>
        );
    }
}

export default MultiEditCard;
