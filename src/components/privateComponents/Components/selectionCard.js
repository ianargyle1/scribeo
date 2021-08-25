import React from "react";

import {
    Card,
    Input,
    CardBody
  } from "reactstrap";

class SelectionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#f8f9fa'
        }
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleSelect (e) {
        this.props.handleSelect(this.props.text);
    }

    handleMouseEnter (e) {
        this.setState({ color: '#ffffff' });
    }

    handleMouseLeave (e) {
        this.setState({ color: '#f8f9fa' });
    }

    render() {
        return (
            <>
                <Card className='mb-3' style={{ borderStyle: 'none' }} onClick={this.handleSelect} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <CardBody className="p-3" style={{ backgroundColor: this.state.color }}>
                        <p className="mb-0">{this.props.text}</p>
                    </CardBody>
                </Card>
            </>
        );
    }
}

export default SelectionCard;
