/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import buildLoader from '../components/Loader';

const Home = ({ credentials, loading, isAuth }) => ((loading === true && isAuth === false)
  ? buildLoader() : (
    <>
      <p>
        Welcome back: {credentials.name}
      </p>
    </>
  ));

// I need to change this mapStateToProps
const mapStateToProps = state => ({
  auth_token: state.authStore.items,
  credentials: state.authStore.credentials,
  loading: state.authStore.loading,
  isAuth: state.authStore.is_auth,
});

Home.propTypes = {
  credentials: Proptypes.shape({
    name: Proptypes.string,
    email: Proptypes.string,
    password: Proptypes.string,
    password_confirmation: Proptypes.string,
  }),
  loading: Proptypes.bool.isRequired,
  isAuth: Proptypes.bool.isRequired,
};

Home.defaultProps = {
  credentials: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
};

export default connect(mapStateToProps, null)(Home);
