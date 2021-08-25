import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
    Card,
    CardBody,
    Button
  } from "reactstrap";

class DisplayCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Card className='mb-3' style={{ borderStyle: 'none' }}>
                    <CardBody className="p-3" style={{ backgroundColor: '#f8f9fa' }}>
                        <p className="mb-0">{this.props.text}</p>
                        <CopyToClipboard text={this.props.text}>
                            <Button color="secondary" size="sm" type="button" style={{ float: 'right' }}>
                                Copy
                            </Button>
                        </CopyToClipboard>
                    </CardBody>
                </Card>
            </>
        );
    }
}

export default DisplayCard;
