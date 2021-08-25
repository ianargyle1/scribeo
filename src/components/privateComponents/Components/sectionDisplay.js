import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DisplayCard from './displayCard';

import {
    Card,
    CardBody,
    Button
  } from "reactstrap";

class SectionDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: []
        }

        for (var i = 0; i < this.props.sections.length; i++) {
            var regex = new RegExp('\\s+' + this.props.sections[i] + '\\s+', 'g')
            var split = this.props.text.split(regex);
            if (split.length < 2) {
                regex = new RegExp(this.props.sections[i] + '\\s+', 'g')
                split = this.props.text.split(regex);
            }
            if (split.length < 2) {
                regex = new RegExp('\\s+' + this.props.sections[i], 'g')
                split = this.props.text.split(regex);
            }
            if (split.length != 2) {
                this.props.error();
                break;
            }

            var text = split[1];
            if (i+1 < this.props.sections.length) {
                var regex = new RegExp('\\s+' + this.props.sections[i+1] + '\\s+', 'g')
                split = text.split(regex);
                if (split.length < 2) {
                    regex = new RegExp(this.props.sections[i+1] + '\\s+', 'g')
                    split = text.split(regex);
                }
                if (split.length < 2) {
                    regex = new RegExp('\\s+' + this.props.sections[i+1], 'g')
                    split = text.split(regex);
                }
                if (split.length != 2) {
                    this.props.error();
                    break;
                }
                text = split[0];
            }
            this.state.sections.push({ title: this.props.sections[i], text: text })
        }
    }

    render() {
        return (
            <>
                {this.state.sections.map(section => 
                    <>
                        <p>{section.title}</p>
                        <DisplayCard text={section.text} />
                    </>
                )}
            </>
        );
    }
}

export default SectionDisplay;
