import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Form, Button, Message } from 'semantic-ui-react';
import { getFormikErrors, touchedOrHasErrorState } from './helpers'
import WizardPage from './WizardPage';
import WizardField from './WizardField';

class Wizard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            values: props.initialValues,
            sharedState: {
                showNext: true,
                showPrevious: true,
                disableNext: false,
                disablePrevious: false
            }
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
            let forcedTouched = touchedOrHasErrorState(touched, errors);

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

    setWizardState = (update, callback) => {
        const { sharedState } = this.state;
        this.setState(prevState => {
            return {
                ...prevState,
                sharedState: {
                    ...sharedState,
                    ...update
                }
            };
        }, callback);
    }

    render() {
        const {
            buttonLabels,
            errorsHeader, disableNextOnError,
            children, debug
        } = this.props;

        let { validateOnChange, validateOnBlur } = this.props;
        validateOnChange = validateOnChange === undefined || validateOnChange;
        validateOnChange = validateOnBlur === undefined || validateOnBlur;

        const { page, values, sharedState } = this.state;
        const pages = React.Children.toArray(children);
        const activePage = pages[page];
        const isLastPage = page === pages.length - 1;

        let { showNext, showPrevious, disableNext, disablePrevious } = activePage.props;
        showNext = (showNext === undefined && sharedState.showNext)
            || showNext;
        showPrevious = (showPrevious === undefined && sharedState.showPrevious)
            || showPrevious;
        disableNext = (disableNext === undefined && sharedState.disableNext)
            || disableNext;
        disablePrevious = (disablePrevious === undefined && sharedState.disablePrevious)
            || disablePrevious;

        const activePageButtonLabels = activePage.props.buttonLabels;
        let submitLabel = 'Submit';
        let nextLabel = 'Next';
        let previousLabel = 'Previous';
        if (activePageButtonLabels && activePageButtonLabels.submit) {
            submitLabel = activePageButtonLabels.submit;
        }
        else if (buttonLabels && buttonLabels.submit) {
            submitLabel = buttonLabels.submit;
        }
        if (activePageButtonLabels && activePageButtonLabels.next) {
            nextLabel = activePageButtonLabels.next;
        }
        else if (buttonLabels && buttonLabels.next) {
            nextLabel = buttonLabels.next;
        }
        if (activePageButtonLabels && activePageButtonLabels.previous) {
            previousLabel = activePageButtonLabels.previous;
        }
        else if (buttonLabels && buttonLabels.previous) {
            previousLabel = buttonLabels.previous;
        }

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
                    const disableNextResult = (hasErrors && disableNextOnError) || disableNext;
                    const disableSubmit = disableNextResult || props.isSubmitting;
                    return (
                        <Form onSubmit={props.handleSubmit}>

                            {React.cloneElement(activePage, {
                                parentState: {
                                    ...props,
                                    setWizardState: this.setWizardState,
                                    previous: (e) => this.previous(e, props),
                                    next: (e) => this.next(e, props)
                                }
                            })}

                            <Form.Group className='wizard-buttons' style={{ display: 'block', overflow: 'hidden'}}>
                                {showNext && isLastPage && (
                                    <Button type='submit' floated='right' primary disabled={disableSubmit}>
                                        {submitLabel}
                                    </Button>
                                )}

                                {showNext && !isLastPage && (
                                    <Button floated='right' onClick={(e) => this.next(e, props)} primary disabled={disableNextResult}>
                                        {nextLabel}
                                    </Button>
                                )}

                                {showPrevious && page > 0 && (
                                    <Button floated='right' onClick={(e) => this.previous(e, props)} disabled={disablePrevious}>
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

Wizard.Page = WizardPage;

Wizard.Field = WizardField;

Wizard.propTypes = {
    buttonLabels: PropTypes.object,
    errorsHeader: PropTypes.string,
    disableNextOnError: PropTypes.bool,
    debug: PropTypes.bool
};

Wizard.defaultProps = {
    disableNextOnError: true,
    debug: false
};

export default Wizard;