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
  // const [values, setValues] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   confirmation: '',
  // });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleNameChange = e => setName(e.target.value);
  const handlePasswordConfirmationChange = e => setPasswordConfirmation(e.target.value);

  const history = useHistory();

  const handleSubmit = event => {
    validatePassword(password, passwordConfirmation) ? signUp(
      {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    ).then(history.push('/dashboard')) : event.preventDefault();
  };
  // const handleChange = evt => {
  //   const { value } = evt.target;
  //   setValues({
  //     ...values,
  //     [evt.target.name]: value,
  //   });
  // };

  return (
    <>
      <form className={styles.mainContainer} onSubmit={handleSubmit}>
        <h2> On Stock </h2>
        <div className={styles.inputContainer}>
          {createInput('name', name, handleNameChange)}
          {createInput('email', email, handleEmailChange, 'email')}
          {createInput('password', password, handlePasswordChange, 'password')}
          {createInput('confirmation', passwordConfirmation, handlePasswordConfirmationChange, 'password')}
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
