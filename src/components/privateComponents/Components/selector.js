import React from "react";
import EditCard from '../Components/editCard'

import {
    Card,
    Input,
    CardBody
  } from "reactstrap";

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: -1
        }

        for (var i = 0; i < this.props.choices.length; i++) {
            if (this.props.choices[i] == this.props.selected) {
                this.state.index = i;
                break;
            }
        }
    
        this.updateSelection = this.updateSelection.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
    }

    updateSelection (text, index) {
        this.props.handleSelect(text);
        this.setState({ index: index });
    }

    handleDeselect () {
        this.props.handleDeselect();
        this.setState({ index: -1 });
    }

    render() {
        return (
            <>
                {this.props.choices.map((choice, index) =>
                    <EditCard text={choice} index={index} selected={index == this.state.index ? true : false} onChange={this.props.onChange} handleSelect={this.updateSelection} handleDeselect={this.handleDeselect} />
                )}
            </>
        );
    }
}

export default Selector;
