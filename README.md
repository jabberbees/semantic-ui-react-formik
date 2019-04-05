# semantic-ui-react-formik

> Creating great forms with formik and Semantic UI React

[![NPM](https://img.shields.io/npm/v/semantic-ui-react-formik.svg)](https://www.npmjs.com/package/semantic-ui-react-formik) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save semantic-ui-react-formik
```

## Usage

```jsx
import React, { Component } from 'react'
import { Wizard } from "semantic-ui-react-formik";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";

const MyForm = ({ onSubmit }) => (
  <Wizard
    initialValues={{
      firstName: "",
      lastName: "",
      email: "",
      favoriteColor: "",
      choice: ""
    }}
    onSubmit={onSubmit}
  >
    <Wizard.Page>
      <FirstPage />
    </Wizard.Page>
    <Wizard.Page>
      <SecondPage />
    </Wizard.Page>
  </Wizard>
);

export default MyForm;
```

## Example

Screenshot from included example:

  * Wizard page 1
  
<img src="https://raw.githubusercontent.com/jabberbees/semantic-ui-react-formik/master/doc/wizard-page1.png"/>

  * Wizard page 2
  
<img src="https://raw.githubusercontent.com/jabberbees/semantic-ui-react-formik/master/doc/wizard-page2.png"/>

  * Wizard page 2 with input errors
  
<img src="https://raw.githubusercontent.com/jabberbees/semantic-ui-react-formik/master/doc/wizard-page2-errors.png"/>

  * Wizard page 3
  
<img src="https://raw.githubusercontent.com/jabberbees/semantic-ui-react-formik/master/doc/wizard-page3.png"/>

## License

MIT © [jabberbees](https://github.com/jabberbees)
