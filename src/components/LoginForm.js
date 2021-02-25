/* eslint-disable no-console */
import React, { useState } from 'react';
import Proptypes from 'prop-types';

const LoginForm = ({ handleSubmit }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
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
        {createInput('email', values.email, handleChange)}
        {createInput('password', values.password, handleChange)}
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

LoginForm.propTypes = {
  handleSubmit: Proptypes.func.isRequired,
};

export default LoginForm;
