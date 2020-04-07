import React from 'react';

const WizardPage = ({ children, parentState }) => {
    return React.cloneElement(children, parentState);
};

export default WizardPage;
