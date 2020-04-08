import React, { Component } from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import {
    setFormikFieldValue,
    getFormikFieldError,
    isSemanticUiReactFormControl,
    isSemanticUiReactFormRadio
} from './helpers';

class WizardField extends Component {

    render() {
        const {
            component,
            componentProps,
            onChange,
            onBlur,
            ...fieldProps
        } = this.props;

        return (
            <Field {...fieldProps}>
                {(renderProps) => {
                    var { id } = componentProps;
                    var { field, form } = renderProps;
                    var { name, value } = field;

                    if (!id) {
                        id = "wizard_field_" + name;
                    }

                    const error = getFormikFieldError(form, name);

                    let props = {
                        ...componentProps,
                        ...field,
                        ...renderProps,
                        id
                    };

                    if (isSemanticUiReactFormControl(component)) {
                        props.error = !!error;
                    }
                    else {
                        props.error = error;
                    }

                    if (isSemanticUiReactFormRadio(component)) {
                        props.value = componentProps.value;
                        props.checked = value === componentProps.value;
                        props.onChange = field.onChange;
                        props.onBlur = field.onBlur;
                    }
                    else {
                        props.value = value || "";
                        props.onChange = (e, { name, value }) => {
                            setFormikFieldValue(form, name, value, true);
                            if (onChange) {
                                onChange(name, value);
                            }
                            // console.log("onChange", name, value, form.values);
                        }
                        props.onBlur = (e) => {
                            form.handleBlur(e);
                            if (onBlur) {
                                onBlur(name, value);
                            }
                            // console.log("onBlur", name, value, form.values);
                        }
                    }

                    return React.createElement(component, props);
                }}
            </Field>
        );
    }
}

WizardField.propTypes = {
    component: PropTypes.elementType,
    componentProps: PropTypes.object,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
};

WizardField.defaultProps = {
    componentProps: {}
};

export default WizardField;
