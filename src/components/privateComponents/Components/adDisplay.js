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

class AdDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            copyTarget: 'primary',
            copyPopover: false
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
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', marginTop: '1rem' }}>
                        <img
                            alt="..."
                            className="img-center img-fluid"
                            style={{ width: '2.5em', marginLeft: '0', marginRight: '0' }}
                            src={this.props.type == 'fb' ? require("../../../images/fb_logo.png").default : require("../../../images/li_logo.png").default}
                        />
                        <div style={{ marginLeft: '1em' }}>
                            <p style={{ fontWeight: '650', margin: '0' }}>{this.props.name}</p>
                            <p style={{ fontWeight: '400', fontSize: '0.8em', margin: '0' }}>Sponsered</p>
                        </div>
                    </div>
                    <CopyToClipboard text={this.props.primary}>
                        <p id="primary" style={{ marginBottom: '.7rem', marginTop: '.7rem', marginLeft: '1rem', marginRight: '1rem', cursor: 'pointer' }} onMouseEnter={this.handleEnter} onMouseLeave={this.handleExit}>{this.props.primary}</p>
                    </CopyToClipboard>
                    <img
                        alt="..."
                        className="img-center img-fluid"
                        style={{ width: '100%' }}
                        src={require("../../../images/placeholder.png").default}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', marginRight: '1rem' }}>
                        <div style={{ maxWidth: '75%' }}>
                            <CopyToClipboard text={this.props.headline}>
                                <p id="headline" style={{ marginBottom: '0', marginTop: '.7rem', fontWeight: '650', cursor: 'pointer' }} onMouseEnter={this.handleEnter} onMouseLeave={this.handleExit}>{this.props.headline}</p>
                            </CopyToClipboard>
                            <CopyToClipboard text={this.props.description}>
                                <p id="description" style={{ marginBottom: '.7rem', marginTop: '0', cursor: 'pointer' }} onMouseEnter={this.handleEnter} onMouseLeave={this.handleExit}>{this.props.description}</p>
                            </CopyToClipboard>
                        </div>
                        <Button color="default" outline size="sm" type="button" style={{ marginLeft: 'auto' }}>
                            {this.props.cta ? this.props.cta : 'Learn More'}
                        </Button>
                    </div>
                </Card>
            </>
        );
    }
}

export default AdDisplay;
