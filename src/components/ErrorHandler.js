import React from 'react';
import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ErrorHandler = ({ errorMessage }) => {
  const history = useHistory();
  return (
    <>
      <p>{errorMessage}</p>
      <button onClick={() => history.push('/')} type="button">
        Login / Signup
      </button>
    </>
  );
};

ErrorHandler.propTypes = {
  errorMessage: Proptypes.string.isRequired,
};

export default ErrorHandler;
