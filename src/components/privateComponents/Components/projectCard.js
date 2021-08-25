import React from "react";
import { navigate } from 'gatsby';

import {
    Card,
    CardBody,
    Col
  } from "reactstrap";

class ProjectCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shadow: '10px'
        }
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleSelect (e) {
        navigate(this.props.to);
    }

    handleMouseEnter (e) {
        this.setState({ shadow: '20px' });
    }

    handleMouseLeave (e) {
        this.setState({ shadow: '10px' });
    }

    render() {
        return (
            <Col className="col-12 col-lg-6 col-xl-4 pl-3 pr-3 pb-3">
                <Card style={{ borderStyle: 'none', boxShadow: '0 0 ' + this.state.shadow + ' 0 rgba(0, 0, 0, 0.2)', height: '100%' }} onClick={this.handleSelect} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <CardBody className="p-3" style={{ backgroundColor: this.state.color, cursor: 'pointer' }}>
                        <i className={'ni ni-' + this.props.icon} style={{ fontSize: '1.5em' }}></i>
                        <p style={{ fontSize: '1.25em', fontWeight: '600', marginBottom: '.17em' }}>{this.props.title}</p>
                        <p>{this.props.description}</p>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default ProjectCard;
