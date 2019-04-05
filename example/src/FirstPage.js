import React from "react";
import { Dropdown, Button, Icon } from 'semantic-ui-react';
import { FormField } from "semantic-ui-react-ext";
import { Wizard } from "semantic-ui-react-formik";
import { required } from './utils';

const Page = (props) => (
  <React.Fragment>
    <Wizard.Field
      name="firstName"
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
      name="lastName"
      component={FormField}
      componentProps={{
        label: 'Last Name',
        placeholder: 'Last name',
        required: true
      }}
      validate={required}
    />
    
    <Wizard.Field
      name="choice"
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
    <Button icon labelPosition='left' onClick={props.previous}>
      <Icon name='undo' />
      Undo 
    </Button>
  </React.Fragment>
);

export default Page;
