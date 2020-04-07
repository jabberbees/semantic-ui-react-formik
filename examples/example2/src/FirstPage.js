import React, { Component } from 'react';
import { FormField } from 'semantic-ui-react-ext';
import { Wizard } from 'semantic-ui-react-formik';
import { Message } from 'semantic-ui-react';

class Page extends Component {

  state = { checking: false, checked: false, ok: false }

  componentDidMount() {
    const { values } = this.props;
    this.validateValues(values, false);
  }

  showNext(show) {
    const { setWizardState } = this.props;
    setWizardState({
      disableNext: !show
    });
  }

  check(values) {
    const f = () => {
      const { username } = values;
      const ok = username.length > 8;
      this.setState({ checking: false, checked: true, ok },
        () => this.showNext(ok));
    }
    const asyncCheck = () => setTimeout(f, 1000);
    this.setState({ checking: true, checked: false }, asyncCheck);
  }

  validateValues = (values, isUpdate) => {
    const { username } = values;
    if (username.length > 3) {
      if (isUpdate) {
        this.check(values);
      }
      else {
        this.showNext(true);
      }
    }
    else {
      this.setState({ checking: false, checked: false },
        () => this.showNext(false));
    }
  }

  validate = (name, value) => {
    const values = {
      ...this.props.values,
      [name]: value
    };
    this.validateValues(values, true);
  }

  render() {
    const { checking, checked, ok } = this.state;

    return (
      <React.Fragment>
        <Wizard.Field
          name='username'
          component={FormField}
          componentProps={{
            label: 'Username',
            placeholder: 'Username',
            required: true,
            autoFocus: true
          }}
          onChange={this.validate}
        />

        <div style={{ marginTop: '60px', marginBottom: '20px' }}>
          <Message hidden={!checking} positive>
            Checking...
          </Message>

          <Message hidden={!(checked && !ok)} negative>
            Not available, try another username...
          </Message>
        </div>
      </React.Fragment>
    );
  }
}

export default Page;
