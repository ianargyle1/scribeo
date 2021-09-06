import React from "react";
import { navigate } from 'gatsby';

import {
    Table
  } from "reactstrap";


var past = 0;
class ProjectRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'white'
        }
    
        past = Math.floor(Date.now() / 1000) - this.props.data.time._seconds;

        this.handleSelect = this.handleSelect.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleSelect (e) {
        navigate('/app/' + this.props.data.type, { state: { ...this.props.data.fields } });
    }

    handleMouseEnter (e) {
        this.setState({ color: '#f8f9fa' });
    }

    handleMouseLeave (e) {
        this.setState({ color: 'white' });
    }

    render () {
        return (
            <tr style={{ backgroundColor: this.state.color, cursor: 'pointer' }} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleSelect}>
                <td>{this.props.name}</td>
                <td>{past > 29030400 ?
                        Math.round(past / 29030400) > 1 ?
                            Math.round(past / 29030400) + ' years ago'
                        : '1 year ago'
                    : past > 2419200 ?
                        Math.round(past / 2419200) > 1 ?
                            Math.round(past / 2419200) + ' months ago'
                        : '1 month ago'
                    : past > 604800 ?
                        Math.round(past / 604800) > 1 ?
                            Math.round(past / 604800) + ' weeks ago'
                        : '1 week ago'
                    : past > 86400 ?
                        Math.round(past / 86400) > 1 ?
                            Math.round(past / 86400) + ' days ago'
                        : '1 day ago'
                    : past > 3600 ?
                        Math.round(past / 3600) > 1 ?
                            Math.round(past / 3600) + ' hours ago'
                        : '1 hour ago'
                    : past > 60 ?
                        Math.round(past / 60) > 1 ?
                            Math.round(past / 60) + ' minutes ago'
                        : '1 minute ago'
                    : 'less than a minute ago'}</td>
                <td><i className="ni ni-fat-remove" style={{fontSize: '1.5em'}}></i></td>
            </tr>
        );
    }
}

export default ProjectRow;
