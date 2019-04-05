import React from "react";
import { Formik, Field, getIn } from "formik";
import { Form, Button, Message } from 'semantic-ui-react';

function getFormikFieldError(form, fieldName) {
    const { serverValidation } = form.status || {};
    const touched = getIn(form.touched, fieldName);
    const error = getIn(form.errors, fieldName);
    const checkTouched = serverValidation ? !touched : touched;
    return checkTouched && error;
};

function setFormikFieldValue(form, name, value, shouldValidate) {
    form.setFieldValue(name, value, shouldValidate);
    form.setFieldTouched(name, true, shouldValidate);
};

function getFormikErrors(form) {
    const { errors } = form;
    let result = [];
    for (const fieldName of Object.keys(errors)) {
        let error = getFormikFieldError(form, fieldName);
        if (error) {
            result.push(error);
        }
    }
    return result;
};

function isSemanticUiReactFormControl(component) {
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

export default class Wizard extends React.Component {
    static Page = ({ children, parentState }) => {
        return React.cloneElement(children, parentState);
    };

    static Field = ({ component, componentProps = {}, ...fieldProps }) => (
        <Field
            {...fieldProps}
            render={props => {
                var { id } = componentProps;
                var { field, form } = props;
                var { name, value } = field;
                if (!id) {
                    id = "wizard_field_" + name;
                }
                const error = getFormikFieldError(form, name);
                componentProps.id = id;
                componentProps.error = isSemanticUiReactFormControl(component)
                    ? !!error
                    : error;
                const valueProps = (typeof value === "boolean")
                    ? { checked: value }
                    : { value: value || "" };
                return React.createElement(component, {
                    ...componentProps,
                    ...field,
                    ...props,
                    ...valueProps,
                    onChange: (e, { name, value }) => {
                        setFormikFieldValue(form, name, value, true);
                    },
                    onBlur: form.handleBlur
                });
            }}
        />
    );

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            values: props.initialValues
        };
    }

    componentDidUpdate = (_prevProps, prevState) => {
        const { page } = this.state;
        if (page !== prevState.page) {
            const { onPageChanged } = this.props;
            if (onPageChanged) {
                onPageChanged(page);
            }
        }
    }

    next = (e, formikBag) => {
        e.preventDefault();

        const { values, touched, validateForm, setErrors, setTouched } = formikBag;

        validateForm(values).then(errors => {
            let forcedTouched = {};
            for (let k of Object.keys(touched)) {
                forcedTouched[k] = touched[k];
            }
            for (let k of Object.keys(errors)) {
                forcedTouched[k] = true;
            }

            setErrors(errors);
            setTouched(forcedTouched);

            const isValid = Object.keys(errors).length === 0;
            if (isValid) {
                this.setState(state => ({
                    page: Math.min(state.page + 1, this.props.children.length - 1)
                }));
            }
        });
    }

    previous = (e, { setErrors }) => {
        e.preventDefault();
        this.setState(state => ({
            page: Math.max(state.page - 1, 0)
        }), () => {
            setErrors([]);
        });
    }

    validate = (values) => {
        const activePage = React.Children.toArray(this.props.children)[this.state.page];
        var result = activePage.props.validate ? activePage.props.validate(values) : {};
        return result;
    };

    handleSubmit = (values, bag) => {
        const { onSubmit } = this.props;
        return onSubmit(values, bag);
    };

    render() {
        const {
            buttonLabels,
            errorsHeader, disableSubmitOnError,
            children, debug
        } = this.props;
        let { validateOnChange, validateOnBlur } = this.props;
        if (validateOnChange === undefined) {
            validateOnChange = true;
        }
        if (validateOnBlur === undefined) {
            validateOnBlur = false;
        }
        const { page, values } = this.state;
        const activePage = React.Children.toArray(children)[page];
        const isLastPage = page === React.Children.count(children) - 1;
        let submitLabel = 'Submit';
        let nextLabel = 'Next';
        let previousLabel = 'Previous';
        if (buttonLabels !== undefined && buttonLabels.submit !== undefined) {
            submitLabel = buttonLabels.submit;
        }
        if (buttonLabels !== undefined && buttonLabels.next !== undefined) {
            nextLabel = buttonLabels.next;
        }
        if (buttonLabels !== undefined && buttonLabels.previous !== undefined) {
            previousLabel = buttonLabels.previous;
        }
        const showSubmit = activePage.props.showSubmit === undefined || activePage.props.showSubmit;
        const showPrevious = activePage.props.showPrevious === undefined || activePage.props.showPrevious;
        return (
            <Formik
                initialValues={values}
                enableReinitialize={false}
                validateOnChange={validateOnChange}
                validateOnBlur={validateOnBlur}
                validate={this.validate}
                onSubmit={this.handleSubmit}
                render={props => {
                    const errors = getFormikErrors(props);
                    const hasErrors = errors.length > 0;
                    const disableNext = hasErrors && disableSubmitOnError;
                    const disableSubmit = disableNext || props.isSubmitting;
                    return (
                        <Form onSubmit={props.handleSubmit}>

                            {React.cloneElement(activePage, {
                                parentState: {
                                    ...props,
                                    previous: (e) => this.previous(e, props),
                                    next: (e) => this.next(e, props)
                                }
                            })}

                            <Form.Group className='wizard-buttons' style={{ display: 'block', overflow: 'hidden'}}>
                                {showSubmit && isLastPage && (
                                    <Button type='submit' floated='right' primary disabled={disableSubmit}>
                                        {submitLabel}
                                    </Button>
                                )}

                                {showSubmit && !isLastPage && (
                                    <Button floated='right' onClick={(e) => this.next(e, props)} primary disabled={disableNext}>
                                        {nextLabel}
                                    </Button>
                                )}

                                {showPrevious && page > 0 && (
                                    <Button floated='right' onClick={(e) => this.previous(e, props)}>
                                        {previousLabel}
                                    </Button>
                                )}
                            </Form.Group>

                            {errorsHeader && hasErrors && (
                                <Message
                                    negative
                                    header={errorsHeader}
                                    list={errors.map((e, i) => ({key: i, content: e}))}
                                />
                            )}

                            {debug && (
                                <pre>{JSON.stringify(props.values, null, 2)}</pre>
                            )}
                        </Form>
                    );
                }}
            />
        );
    }
}
