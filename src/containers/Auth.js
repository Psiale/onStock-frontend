/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Auth = () => {
  const history = useHistory();
  // I can pass a string parameter for the reducer to handle the function
  // login and signup
  const handleSubmit = () => {
    // do this with the store, I think maybe a isAuth boolean to make it work
    history.push('/dashboard');
  };
  return (
    <>
      <LoginForm handleSubmit={handleSubmit} />
      <SignupForm handleSubmit={handleSubmit} />
    </>
  );
};

const mapStateToProps = state => {(
  loading: state.loading,
  credentials: state.credentials,
)}
const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
