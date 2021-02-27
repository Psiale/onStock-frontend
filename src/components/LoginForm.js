/* eslint-disable no-console */
import React, { useState } from 'react';

const LoginForm = () => {
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
      <form onSubmit={null}>
        {createInput('email', values.email, handleChange)}
        {createInput('password', values.password, handleChange)}
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default LoginForm;
