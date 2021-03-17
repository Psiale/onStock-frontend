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
        <div />
        <button type="button">
          Login
        </button>
        <button type="button">
          SignUp
        </button>
      </div>
      <LoginForm />
      <SignupForm />
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
