import React from 'react';
import { Wizard } from 'semantic-ui-react-formik';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const MyWizard = ({ onPageChanged }) => (
  <div className='App'>
    <Wizard
      initialValues={{
        username: '',
        email: '',
        favoriteColor: '',
      }}
      buttonLabels={{
        previous: 'PREVIOUS',
        next: 'NEXT',
        submit: 'SUBMIT'
      }}
      errorsHeader='Please check the following errors:'
      onPageChanged={onPageChanged}
      onSubmit={(values, actions) => {
        sleep(300).then(() => {
          window.alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        });
      }}
      debug={false}
    >
      <Wizard.Page
        showPrevious={false}
        validate={values => {
          const errors = {};
          if (values.applicant && values.applicant.firstName === values.applicant.lastName) {
            errors.applicant = {
              firstName: 'Must be different than last name',
              lastName: 'Must be different than first name'
            };
          }
          return errors;
        }}
      >
        <FirstPage />
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {};
          if (!values.email.endsWith('.cool')) {
            errors.email = 'Only .cool email addresses are supported';
          }
          return errors;
        }}
        buttonLabels={{
          previous: 'GO BACK',
          submit: 'VALIDATE'
        }}
      >
        <SecondPage />
      </Wizard.Page>
    </Wizard>
  </div>
);

export default MyWizard;
