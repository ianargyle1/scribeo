import React from "react";
import SourceCard from '../Components/sourceCard'

import {
    Card,
    Input,
    CardBody
  } from "reactstrap";

class SourceSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: {}
        }
    
        this.updateSelection = this.updateSelection.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
    }

    updateSelection (source, index) {
        var newSources = this.state.sources;
        newSources[index] = { selected: true, source: source };
        var selected = [];
        for (var index in newSources) {
            if (newSources[index].selected) {
                selected.push(newSources[index].source);
            }
        }
        this.props.update(selected);
        this.setState({ sources: newSources });
    }

    handleDeselect (index) {
        var newSources = this.state.sources;
        newSources[index].selected = false;
        var selected = [];
        for (var index in newSources) {
            if (newSources[index].selected) {
                selected.push(newSources[index].source);
            }
        }
        this.props.update(selected);
        this.setState({ sources: newSources });
    }

    render() {
        return (
            <>
                {this.props.sources.map((source, index) =>
                    <SourceCard source={source} index={index} selected={this.state.sources[index] && this.state.sources[index].selected} handleSelect={this.updateSelection} handleDeselect={this.handleDeselect} />
                )}
            </>
        );
    }
}

export default SourceSelector;
