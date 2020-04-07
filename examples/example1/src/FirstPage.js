import React from "react";
import { Dropdown, Button, Icon, Form } from 'semantic-ui-react';
import { FormField } from "semantic-ui-react-ext";
import { Wizard } from "semantic-ui-react-formik";
import { required } from './utils';

const Page = (props) => (
  <React.Fragment>
    <Wizard.Field
      name="applicant.firstName"
      component={FormField}
      componentProps={{
        label: 'First Name',
        placeholder: 'First name',
        required: true,
        autoFocus: true
      }}
      validate={required}
    />

    <Wizard.Field
      name="applicant.lastName"
      component={FormField}
      componentProps={{
        label: 'Last Name',
        placeholder: 'Last name',
        required: true
      }}
      validate={required}
    />

    <Wizard.Field
      name="applicant.choice"
      component={FormField}
      componentProps={{
        label: 'Choice',
        control: Dropdown,
        placeholder: 'Your choice',
        fluid: true,
        required: true,
        selection: true,
        options: [
          {
            key: 'one',
            text: 'One',
            value: 1
          },
          {
            key: 'two',
            text: 'Two',
            value: 2
          },
          {
            key: 'three',
            text: 'Three',
            value: 3
          }
        ]
      }}
      validate={required}
    />

    <div className='field required fields inline'>
      <label>T-shirt Size</label>

      <Form.Group inline style={{marginBottom: '0px'}}>
        <Wizard.Field
          name="applicant.tshirtSize"
          component={Form.Radio}
          componentProps={{
            id: 'small',
            label: 'Small',
            value: 'small'
          }}
          validate={(v) => {
            switch (v) {
              case undefined: return 'T-shirt size is required';
              case 'giant': return 'Giants are not allowed here';
              default: return null;
            }
          }}
        />

        <Wizard.Field
          name="applicant.tshirtSize"
          component={Form.Radio}
          componentProps={{
            id: 'medium',
            label: 'Medium',
            value: 'medium'
          }}
        />

        <Wizard.Field
          name="applicant.tshirtSize"
          component={Form.Radio}
          componentProps={{
            id: 'large',
            label: 'Large',
            value: 'large'
          }}
        />

        <Wizard.Field
          name="applicant.tshirtSize"
          component={Form.Radio}
          componentProps={{
            id: 'giant',
            label: 'Giant',
            value: 'giant'
          }}
        />
      </Form.Group>
    </div>

    <Button icon labelPosition='left' onClick={props.previous}>
      <Icon name='undo' />
      Undo
    </Button>
  </React.Fragment>
);

export default Page;
