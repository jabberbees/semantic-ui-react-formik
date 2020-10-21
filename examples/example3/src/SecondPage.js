import React from "react";
import { Form } from 'semantic-ui-react';
import { FormField } from "semantic-ui-react-ext";
import { Wizard } from "semantic-ui-react-formik";
import { required } from './utils';

const Page = () => (
  <React.Fragment>
    <Wizard.Field
      name="email"
      component={FormField}
      componentProps={{
        label: 'Email',
        autoFocus: true
      }}
      validate={required}
    />

    <Wizard.Field
      name="favoriteColor"
      component={Form.Dropdown}
      componentProps={{
        label: 'Favorite Color',
        placeholder: 'Your favorite color',
        fluid: true,
        selection: true,
        options: [
          {
            key: 'red',
            text: 'Red',
            value: 'red'
          },
          {
            key: 'green',
            text: 'Green',
            value: 'green'
          },
          {
            key: 'blue',
            text: 'Blue',
            value: 'blue'
          }
        ]
      }}
      validate={required}
    />
  </React.Fragment>
);

export default { Page };
