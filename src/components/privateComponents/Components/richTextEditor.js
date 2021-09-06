import React from "react";
// import ReactQuill from 'react-quill';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Loadable from "@loadable/component"

import {
    Button,
} from "reactstrap";


const LoadableEditor = Loadable(() => import('./RTE'))
export default LoadableEditor

// class RichTextEditor extends React.Component {
//     constructor(props) {
//         super(props);

//         var text = this.props.text.replaceAll('\n', '<br />');

//         this.state = {
//             text: text
//         }

//         this.onChange = this.onChange.bind(this);
//     }

//     onChange (value) {
//         if ('onChange' in this.props) {
//             this.props.onChange(value);
//         }
//         this.setState({ text: value });
//     }

//     render() {
//         return (
//             <>
//                 <LoadableEditor handleChange={this.props.onChange} />
//             </>
//         );
//     }
// }
// class RichTextEditor extends React.Component {
//     constructor(props) {
//         super(props);

//         var text = this.props.text.replaceAll('\n', '<br />');

//         this.state = {
//             text: text
//         }

//         this.onChange = this.onChange.bind(this);
//     }

//     onChange (value) {
//         if ('onChange' in this.props) {
//             this.props.onChange(value);
//         }
//         this.setState({ text: value });
//     }

//     render() {
//         return (
//             <>
//                 {/* <ReactQuill value={this.state.text} onChange={this.onChange} /> */}
//                 {/* <FroalaEditor
//                     tag='textarea'
//                     config={{ placeholderText: this.state.text }}
//                     model={this.state.text}
//                     onModelChange={this.onChange}
//                 /> */}
//                 {/* <FroalaEditorComponent
//                     tag='textarea'
//                     config={{ placeholderText: this.state.text }}
//                     model={this.state.text}
//                     onModelChange={this.onChange}
//                 /> */}
//                 {/* <Input
//                     className="form-control-alternative"
//                     rows='3'
//                     type='textarea'
//                     onChange={this.onChange}
//                     value={this.state.text}
//                 /> */}
//                 <CopyToClipboard text={this.state.text}>
//                     <Button color="secondary" size="sm" type="button" style={{ float: 'right', marginTop: '1em', display: 'block' }}>
//                         Copy
//                     </Button>
//                 </CopyToClipboard>
//             </>
//         );
//     }
// }

// export default RichTextEditor;
