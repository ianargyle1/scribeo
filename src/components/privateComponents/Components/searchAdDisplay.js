import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
    Card,
    CardBody,
    Button,
    Container,
    Col,
    Row,
    Popover,
    PopoverBody
  } from "reactstrap";

class SearchAdDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            copyTarget: 'headline',
            copyPopover: false,
            headlineUnderline: false
        }

        this.handleEnter = this.handleEnter.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    handleEnter (e) {
        this.setState({ copyTarget: e.target.id, copyPopover: true });
    }

    handleExit (e) {
        this.setState({ copyPopover: false });
    }

    render() {
        return (
            <>
                <Card className='mb-3' style={{ border: '0.0625rem solid rgba(0, 0, 0, 0.2)' }}>
                    <CardBody>
                        <Popover
                            placement="top"
                            isOpen={this.state.copyPopover}
                            key={this.state.copyTarget}
                            target={this.state.copyTarget}
                            className="popover-primary"
                        >
                            <PopoverBody>
                                Copy
                            </PopoverBody>
                        </Popover>
                        <CopyToClipboard text={this.props.headline}>
                            <p id="headline" style={{ fontSize: '20px', color: '#1a0dab', cursor: 'pointer', marginBottom: '3px', textDecoration: this.state.headlineUnderline ? 'underline' : 'none' }}
                                onMouseEnter={ (e) => { this.setState({ headlineUnderline: true }); this.handleEnter(e) } }
                                onMouseLeave={ (e) => { this.setState({ headlineUnderline: false }); this.handleExit(e) } }
                            >
                                {this.props.headline}
                            </p>
                        </CopyToClipboard>
                        <CopyToClipboard text={this.props.description}>
                            <p id="description"
                                style={{ color: '#4d5156', margin: '0', cursor: 'pointer' }}
                                onMouseEnter={this.handleEnter}
                                onMouseLeave={this.handleExit}
                            >
                                {this.props.description}
                            </p>
                        </CopyToClipboard>
                    </CardBody>
                </Card>
            </>
        );
    }
}

export default SearchAdDisplay;
