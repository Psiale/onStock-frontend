/* eslint-disable no-console */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signupRequest } from '../redux/actions/auth';

const SignupForm = ({ signupRequest }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const history = useHistory();
  // I can pass a string parameter for the reducer to handle the function
  // login and signup
  const handleSubmit = () => {
    // do this with the store, I think maybe a isAuth boolean to make it work
    signupRequest(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
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
  signupRequest: Proptypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signupRequest: data => dispatch(signupRequest(data)),
});
export default connect(null, mapDispatchToProps)(SignupForm);
