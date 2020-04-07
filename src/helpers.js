import { Form, Radio } from 'semantic-ui-react';
import { getIn } from 'formik';

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

export function getFormikFieldError(form, fieldName) {
    const { serverValidation } = form.status || {};
    const touched = getIn(form.touched, fieldName);
    const error = getIn(form.errors, fieldName);
    const checkTouched = serverValidation ? !touched : touched;
    return checkTouched && error;
};

export function setFormikFieldValue(form, name, value, shouldValidate) {
    form.setFieldValue(name, value, shouldValidate);
    form.setFieldTouched(name, true, shouldValidate);
};

function appendObjectErrors(object, parentField, form, result) {
    for (const key of Object.keys(object)) {
        const val = object[key];
        
        const fieldName = parentField
        ? (Array.isArray(object) ? parentField + '[' + key + ']' : parentField + '.' + key)
        : key;
        
        if (isObject(val)) {
            appendObjectErrors(val, fieldName, form, result);
        }
        else {
            const error = getFormikFieldError(form, fieldName);
            if (error) {
                result.push(error);
            }
        }
    }
}

export function getFormikErrors(form) {
    const { errors } = form;
    let result = [];
    appendObjectErrors(errors, undefined, form, result);
    return result;
};

function appendErrorsToTouched(result, errors) {
    for (let key of Object.keys(errors)) {
        const val = errors[key];
        if (isObject(val)) {
            result[key] = Array.isArray(val) ? [] : {};
            appendErrorsToTouched(result[key], val);
        }
        else {
            result[key] = true;
        }
    }
}

export function touchedOrHasErrorState(touched, errors) {
    let result = {};
    for (let k of Object.keys(touched)) {
        result[k] = touched[k];
    }
    appendErrorsToTouched(result, errors);
    return result;
}

export function isSemanticUiReactFormControl(component) {
    return (component === Form.Button)
        || (component === Form.Checkbox)
        || (component === Form.Dropdown)
        || (component === Form.Group)
        || (component === Form.Input)
        || (component === Form.Radio)
        || (component === Form.Select)
        || (component === Form.TextArea)
        ;
}

export function isSemanticUiReactFormRadio(component) {
    return (component === Radio)
        || (component === Form.Radio)
        ;
}
