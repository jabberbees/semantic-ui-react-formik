import React from 'react';
import { Form } from 'semantic-ui-react';
import { Wizard } from 'semantic-ui-react-formik';

const Page = () => (
  <React.Fragment>
    {/* <Wizard.Field
      name='name'
      component={Form.Input}
      componentProps={{
      }}
    /> */}

    <Form.Field required>
      <label>T-shirt Size</label>

      <Form.Group inline style={{ marginBottom: '0px' }}>
        <Wizard.Field
          name='tshirtSize'
          component={Form.Radio}
          componentProps={{
            id: 'small',
            label: 'Small',
            value: 'small'
          }}
        />

        <Wizard.Field
          name='tshirtSize'
          component={Form.Radio}
          componentProps={{
            id: 'medium',
            label: 'Medium',
            value: 'medium'
          }}
        />

        <Wizard.Field
          name='tshirtSize'
          component={Form.Radio}
          componentProps={{
            id: 'large',
            label: 'Large',
            value: 'large'
          }}
        />

        <Wizard.Field
          name='tshirtSize'
          component={Form.Radio}
          componentProps={{
            id: 'giant',
            label: 'Giant',
            value: 'giant'
          }}
        />
      </Form.Group>
    </Form.Field>
  </React.Fragment>
);

const Validator = ({ tshirtSize }) => {
  const errors = {};
  switch (tshirtSize) {
    case undefined: errors.tshirtSize = 'T-shirt size is required'; break;
    case 'giant': errors.tshirtSize = 'Giants are not allowed here'; break;
    default: break;
  }
  return errors;
}

export default { Page, Validator };
