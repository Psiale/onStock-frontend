/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { validatePassword, createInput } from '../helpers';
import { signupRequest } from '../redux/actions/auth';
import styles from './AuthForm.module.css';

const SignupForm = ({ signupRequest }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  });
  const history = useHistory();
  // I can pass a string parameter for the reducer to handle the function
  // login and signup

  const handleSubmit = event => {
    // do this with the store, I think maybe a isAuth boolean to make it work
    validatePassword(values.password, values.password_confirmation) ? signupRequest(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmation,
      },
    ).then(history.push('/dashboard')) : event.preventDefault();
  };
  const handleChange = evt => {
    const { value } = evt.target;
    setValues({
      ...values,
      [evt.target.name]: value,
    });

    console.log(values);
  };

  return (
    <>
      <form className={styles.mainContainer} onSubmit={handleSubmit}>
        <h2> Create Account </h2>
        <div className={styles.inputContainer}>
          {createInput('name', values.name, handleChange)}
          {createInput('email', values.email, handleChange, 'email')}
          {createInput('password', values.password, handleChange, 'password')}
          {createInput('confirmation', values.confirmation, handleChange, 'password')}
          <input type="submit" value="Sign Up" />
        </div>
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
