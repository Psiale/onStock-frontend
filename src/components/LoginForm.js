/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import { loginRequest } from '../redux/actions/auth';

const LoginForm = ({ loginRequest }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleSubmit = () => {
    // do this with the store, I think maybe a isAuth boolean to make it work
    loginRequest(
      {
        email: values.email,
        password: values.password,
      },
    ).then(history.push('/dashboard'));
  };
  const handleChange = evt => {
    const { value } = evt.target;
    setValues({
      ...values,
      [evt.target.name]: value,
    });

    console.log(values);
  };

  const createInput = (htmlFor, inputValue, changeHandle, type = 'text') => (
    <>
      <label htmlFor={htmlFor}>
        {htmlFor}
        <input
          required
          id={htmlFor}
          name={htmlFor}
          type={type}
          value={inputValue}
          onChange={changeHandle}
        />
      </label>
    </>
  );
  return (
    <>
      <form onSubmit={handleSubmit}>
        {createInput('email', values.email, handleChange)}
        {createInput('password', values.password, handleChange, 'password')}
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

LoginForm.propTypes = {
  loginRequest: Proptypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loginRequest: data => dispatch(loginRequest(data)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
