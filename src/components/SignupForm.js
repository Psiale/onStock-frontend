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
  };

  const createInput = (htmlFor, value) => (
    <>
      <label htmlFor={htmlFor}>
        {htmlFor}
        <input id={htmlFor} type="text" value={value} onChange={handleChange} />
      </label>
    </>
  );
  return (
    <>
      <form onSubmit={handleSubmit}>
        {createInput('name', values.name)}
        {createInput('email', values.email)}
        {createInput('password', values.password)}
        {createInput('password confirmation', values.password_confirmation)}
        <input type="submit" value="Sign up" />
      </form>
    </>
  );
};

SignupForm.propTypes = {
  handleSubmit: Proptypes.func.isRequired,
};
export default SignupForm;
