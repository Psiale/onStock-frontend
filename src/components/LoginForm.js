import React, { useState } from 'react';
import Proptypes from 'prop-types';

const LoginForm = ({ handleSubmit }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
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
        {createInput('email', values.email)}
        {createInput('password', values.password)}
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

LoginForm.propTypes = {
  handleSubmit: Proptypes.func.isRequired,
};

export default LoginForm;
