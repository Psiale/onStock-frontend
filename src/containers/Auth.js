/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import styles from './Auth.module.css';
import { saveItem } from '../helpers';

const Auth = ({ initialState }) => {
  const [authOption, setAuthOption] = useState({
    option: 'signup',
  });
  const handleAuthOption = option => {
    (option === 'signup')
      ? setAuthOption({ option: 'signup' })
      : setAuthOption({ option: 'login' });
  };
  useLayoutEffect(() => {
    console.log('im running');
    initialState();
    saveItem('token', '');
  }, []);
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <div className={styles.inputsContainer}>
            {(authOption.option === 'signup') ? <SignupForm /> : <LoginForm /> }
          </div>
          <div className={styles.backgroundContainer}>
            <h3>
              {(authOption.option === 'login')
                ? 'Welcome Back, we missed you 🥰'
                : "Create a new account to start tracking your business's raw materials 🚀"}

            </h3>
          </div>
        </div>
        <div className={styles.authOptionsContainer}>
          <button className={(authOption.option === 'login') ? styles.clickedButton : styles.disabledButton} onClick={() => handleAuthOption('login')} type="button">
            Login
          </button>
          <button className={(authOption.option === 'signup') ? styles.clickedButton : styles.disabledButton} onClick={() => handleAuthOption('signup')} type="button">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

Auth.propTypes = {
  initialState: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  initialState: () => dispatch({ type: 'DEFAULT' }),
});

export default connect(null, mapDispatchToProps)(Auth);
