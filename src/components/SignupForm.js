/* eslint-disable no-console */
import React, { useState } from 'react';
import Proptypes from 'prop-types';

const SignupForm = ({ handleSubmit }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const handleChange = evt => {
    const { value } = evt.target;
    setValues({
      ...values,
      [evt.target.name]: value,
    });

    console.log(values);
  };

  const createInput = (htmlFor, inputValue, changeHandle) => {
    console.log(inputValue);
    return (
      <>
        <label htmlFor={htmlFor}>
          {htmlFor}
          <input id={htmlFor} name={htmlFor} type="text" value={inputValue} onChange={changeHandle} />
        </label>
      </>
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {createInput('name', values.name, handleChange)}
        {createInput('email', values.email, handleChange)}
        {createInput('password', values.password, handleChange)}
        {createInput('password_confirmation', values.password_confirmation, handleChange)}
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

SignupForm.propTypes = {
  handleSubmit: Proptypes.func.isRequired,
};
export default SignupForm;
