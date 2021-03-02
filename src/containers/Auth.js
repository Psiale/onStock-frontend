/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Auth = ({ isAuth, initialState }) => {
  useEffect(() => {
    console.log('im running');
    initialState();
  }, [isAuth]);
  return (
    <>
      <LoginForm />
      <SignupForm />
    </>
  );
};

Auth.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  initialState: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  initialState: () => dispatch({ type: 'DEFAULT' }),
});

const mapStateToProps = state => ({
  isAuth: state.authStore.is_auth,
});
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
