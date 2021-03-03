/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
import React, { useLayoutEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import buildLoader from '../components/Loader';

useLayoutEffect(() => {
  // build the get coffee shop component here
}, []);
const Home = ({
  
  credentials, loading, isAuth, business,
}) => ((loading === true && isAuth === false)
  ? buildLoader() : (
    <>
      <p>
        Welcome back: {credentials.name}
        Business name: {business.name}
      </p>
    </>
  ));

// I need to change this mapStateToProps
const mapStateToProps = state => ({
  auth_token: state.authStore.items,
  credentials: state.authStore.credentials,
  loading: state.authStore.loading,
  isAuth: state.authStore.is_auth,
  business: state.dataStore.business,
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
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
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
