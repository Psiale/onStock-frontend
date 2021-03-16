import React from 'react';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import styles from './Loader.module.css';

const buildLoader = () => {
  const history = useHistory();
  setTimeout(() => {
    history.goBack();
  }, 20000);
  return (
    <div className={styles.mainContainer}>
      <Loader
        className={styles.loader}
        type="ThreeDots"
        color="rgb(18, 211, 236)"
        height={300}
        width={300}
        timeout={20000}
      />
    </div>
  );
};

export default buildLoader;
