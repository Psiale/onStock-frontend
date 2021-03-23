/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { validatePassword, createInput } from '../helpers';
import { signUp } from '../redux/actions/auth';
import styles from './AuthForm.module.css';

const SignupForm = ({ signUp }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  });
  const history = useHistory();

  const handleSubmit = event => {
    validatePassword(values.password, values.confirmation) ? signUp(
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
  };

  return (
    <>
      <form className={styles.mainContainer} onSubmit={handleSubmit}>
        <h2> On Stock </h2>
        <div className={styles.inputContainer}>
          {createInput('name', values.name, handleChange)}
          {createInput('email', values.email, handleChange, 'email')}
          {createInput('password', values.password, handleChange, 'password')}
          {createInput('confirmation', values.confirmation, handleChange, 'password')}
          <input type="submit" value="Signup" />
        </div>
      </form>
    </>
  );
};

SignupForm.propTypes = {
  signUp: Proptypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signUp: signUpParams => dispatch(signUp(signUpParams)),
});

export default connect(null, mapDispatchToProps)(SignupForm);
