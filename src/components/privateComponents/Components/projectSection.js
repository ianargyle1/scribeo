import React from "react";

import {
    Container,
    Row
  } from "reactstrap";

function ProjectSection (props) {
    return (
        <Container style={{ margin: '0 0 0 0', maxWidth: '100%' }}>
            <h3 style={{ fontSize: '1.5em', fontWeight: '600', marginBottom: '.7em', marginTop: '1.5em' }}>{props.title}</h3>
            <Row>
                {props.children}
            </Row>
        </Container>
    );
}

export default ProjectSection;
