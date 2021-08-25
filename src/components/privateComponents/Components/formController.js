import React from "react";
import FormComponent from './formComponent';

// reactstrap components
import {
  Form,
  FormGroup
} from "reactstrap";

class FormController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            expandOptions: false,
            values: {}
        }

        this.updateValue = this.updateValue.bind(this);
        this.toggleMoreOpt = this.toggleMoreOpt.bind(this);
        this.hasOptionalProps = this.hasOptionalProps.bind(this);
    }

    updateValue (e) {
        const id = e.target.id;
        var data = e.target.value;
        this.props.updateValues(id, data);
    }

    toggleMoreOpt () {
        this.setState({ expandOptions: !this.state.expandOptions });
    }

    hasOptionalProps () {
        var hasOptional = false;
        for (var i = 0; i < this.props.children.length; i++) {
            if (!this.props.children[i].props.required) {
                hasOptional = true;
            }
        }
        return hasOptional;
    }

    render() {
        return (
            <Form role="form">
                {this.props.children.map(child => (
                    child.props.required ?
                        'showWhen' in child.props && child.props.showWhen ?
                            <FormComponent updateValue={this.updateValue} value={this.props.currentValues[child.props.inputId]} errors={this.props.errorIds} {...child.props}>{child.props.children}</FormComponent>
                        : !('showWhen' in child.props) ?
                            <FormComponent updateValue={this.updateValue} value={this.props.currentValues[child.props.inputId]} errors={this.props.errorIds} {...child.props}>{child.props.children}</FormComponent>
                        : null
                    : null
                ))}
                {this.hasOptionalProps() ?
                    <FormGroup>
                        <div style={{ cursor: 'pointer' }} onClick={this.toggleMoreOpt}>
                            <label
                                className="form-control-label mr-2"
                            >
                                More Options
                            </label>
                            { this.state.expandOptions ?
                            <i className="ni ni-bold-down align-middle"></i>
                            : <i className="ni ni-bold-right align-middle"></i> }
                        </div>
                    </FormGroup>
                : null}
                { this.state.expandOptions ?
                    this.props.children.map(child => (
                        !child.props.required ?
                            'showWhen' in child.props && child.props.showWhen ?
                                <FormComponent updateValue={this.updateValue} value={this.props.currentValues[child.props.inputId]} errors={this.props.errorIds} {...child.props}>{child.props.children}</FormComponent>
                            : !('showWhen' in child.props) ?
                                <FormComponent updateValue={this.updateValue} value={this.props.currentValues[child.props.inputId]} errors={this.props.errorIds} {...child.props}>{child.props.children}</FormComponent>
                            : null
                        : null
                    ))
                : null }
            </Form>
        );
    }
}

export default FormController;