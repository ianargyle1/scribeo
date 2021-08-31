import React from "react";

import {
    Table
  } from "reactstrap";

class ProjectRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'white'
        }
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleSelect (e) {
        //navigate(this.props.to);
    }

    handleMouseEnter (e) {
        this.setState({ color: '#f8f9fa' });
    }

    handleMouseLeave (e) {
        this.setState({ color: 'white' });
    }

    render () {
        return (
            <tr style={{ backgroundColor: this.state.color, cursor: 'pointer' }} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.date}</td>
                <td><i className="ni ni-fat-remove" style={{fontSize: '1.5em'}}></i></td>
            </tr>
        );
    }
}

export default ProjectRow;
