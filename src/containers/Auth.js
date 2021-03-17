/* eslint-disable no-console */
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
// import styles from './Auth.module.css';
import { saveItem } from '../helpers';

const Auth = ({ initialState }) => {
  useLayoutEffect(() => {
    console.log('im running');
    initialState();
    saveItem('token', '');
  }, []);
  return (
    <>
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
