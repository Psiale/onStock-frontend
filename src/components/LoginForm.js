/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import { logIn } from '../redux/actions/auth';
import styles from './AuthForm.module.css';

import { createInput } from '../helpers';

const LoginForm = ({ logIn }) => {
  // const [values, setValues] = useState({
  //   email: '',
  //   password: '',
  // });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const history = useHistory();

  const handleSubmit = () => {
    logIn(
      {
        email,
        password,
      },
    ).then(history.push('/dashboard'));
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
        <div className={`${styles.inputContainer} ${styles.inputContainerLogin}`}>
          {createInput('email', email, handleEmailChange, 'email')}
          {createInput('password', password, handlePasswordChange, 'password')}
          <input type="submit" value="Login" />
        </div>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  logIn: Proptypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logIn: data => dispatch(logIn(data)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
