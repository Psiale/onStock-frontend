/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import { loginRequest } from '../redux/actions/auth';

const LoginForm = ({ loginRequest, isAuth }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleSubmit = () => {
    // do this with the store, I think maybe a isAuth boolean to make it work
    loginRequest(
      {
        email: values.email,
        password: values.password,
      },
    );
    (isAuth) ? history.push('/dashboard') : null;
  };
  const handleChange = evt => {
    const { value } = evt.target;
    setValues({
      ...values,
      [evt.target.name]: value,
    });

    console.log(values);
  };

  const createInput = (htmlFor, inputValue, changeHandle) => (
    <>
      <label htmlFor={htmlFor}>
        {htmlFor}
        <input id={htmlFor} name={htmlFor} type="text" value={inputValue} onChange={changeHandle} />
      </label>
    </>
  );
  return (
    <>
      <form onSubmit={handleSubmit}>
        {createInput('email', values.email, handleChange)}
        {createInput('password', values.password, handleChange)}
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

LoginForm.propTypes = {
  loginRequest: Proptypes.func.isRequired,
  isAuth: Proptypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loginRequest: data => dispatch(loginRequest(data)),
});

const mapStateToProps = state => ({
  isAuth: state.authStore.is_auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
