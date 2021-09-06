import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import "../../../assets/vendor/font-awesome/css/font-awesome.min.css";
// import 'froala-editor/js/froala_editor.pkgd.min.js';

// // Require Editor CSS files.
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/css/froala_editor.pkgd.min.css';
// import FroalaEditor from "react-froala-wysiwyg";

import {
    Button,
} from "reactstrap";

const RTE = props => {
    return (
        <>
            <ReactQuill value={props.text.replaceAll('\n', '<br />')} onChange={props.handleChange} />
            {/* <FroalaEditor
                tag='textarea'
                config={{ placeholderText: props.text }}
            /> */}
            {/* <FroalaEditorComponent
                tag='textarea'
                config={{ placeholderText: this.state.text }}
                model={this.state.text}
                onModelChange={this.onChange}
            /> */}
            {/* <Input
                className="form-control-alternative"
                rows='3'
                type='textarea'
                onChange={this.onChange}
                value={this.state.text}
            /> */}
            {/* <CopyToClipboard text={props.text}>
                <Button color="secondary" size="sm" type="button" style={{ float: 'right', marginTop: '1em', display: 'block' }}>
                    Copy
                </Button>
            </CopyToClipboard> */}
        </>
    )
}

export default RTE;