import React from "react";
import { Wizard } from "semantic-ui-react-formik";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const MyForm = ({ onPageChanged }) => (
  <div className="App">
    <Wizard
      initialValues={{
        email: "",
        favoriteColor: "",
      }}
      buttonLabels={{
        previous: "PREVIOUS",
        next: "NEXT",
        submit: "SUBMIT"
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
      <Wizard.Page validate={FirstPage.Validator}>
        <FirstPage.Page />
      </Wizard.Page>

      <Wizard.Page>
        <SecondPage.Page />
      </Wizard.Page>
    </Wizard>
  </div>
);

export default MyForm;
