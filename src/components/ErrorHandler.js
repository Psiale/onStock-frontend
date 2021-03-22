import React from 'react';
import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './ErrorHandler.module.css';

const ErrorHandler = ({ errorMessage }) => {
  const history = useHistory();
  return (
    <div className={styles.mainContainer}>
      <h1> :C </h1>
      <h2>{errorMessage}</h2>
      <button onClick={() => history.push('/')} type="button">
        Login / Signup
      </button>
    </div>
  );
};

ErrorHandler.propTypes = {
  errorMessage: Proptypes.string.isRequired,
};

export default ErrorHandler;
