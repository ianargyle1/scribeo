import React from "react";

import {
    Card,
    Input,
    CardBody
  } from "reactstrap";

class SourceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#f8f9fa',
            selected: false
        }
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleSelect (e) {
        if (this.props.selected) {
            this.props.handleDeselect(this.props.index);
        } else {
            this.props.handleSelect(this.props.source, this.props.index);
        }
    }

    handleMouseEnter (e) {
        this.setState({ color: '#f2f2f2' });
    }

    handleMouseLeave (e) {
        this.setState({ color: '#f8f9fa' });
    }

    render() {
        return (
            <>
                <Card className='mb-3' style={{ borderStyle: 'none' }} onClick={this.handleSelect} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <CardBody className="p-3" style={{ backgroundColor: (this.props.selected ? '#dedede' : this.state.color) }}>
                        <p className="mb-0">{this.props.source.title}</p>
                        <a href={this.props.source.link} target="_blank">{this.props.source.link}</a>
                        <p className="mb-0">{this.props.source.snippet}</p>
                    </CardBody>
                </Card>
            </>
        );
    }
}

export default SourceCard;
