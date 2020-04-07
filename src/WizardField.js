import React from 'react';
import { Field } from 'formik';
import {
    setFormikFieldValue,
    getFormikFieldError,
    isSemanticUiReactFormControl,
    isSemanticUiReactFormRadio
} from './helpers';

const WizardField = ({ component, componentProps = {}, ...fieldProps }) => (
    <Field
        {...fieldProps}
        render={renderProps => {
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
                }
                props.onBlur = form.handleBlur;
            }

            return React.createElement(component, props);
        }}
    />
);

export default WizardField;
