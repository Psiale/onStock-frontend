/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
import React, { useLayoutEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import buildLoader from '../components/Loader';
import { fetchGetData } from '../redux/actions/data';
import { retrieveItem } from '../helpers';
import BusinessComponent from '../components/setters/BusinessComponent';

const Home = ({
  
  credentials, loading, isAuth, business, fetchGetData,
}) => {
  if (loading === true && isAuth === false) {
    return buildLoader();
  }
  useLayoutEffect(() => {
    console.log('fetching products');
    const authToken = retrieveItem('token').replace(/['"]+/g, '');
    console.log(authToken);
    console.log('get Request happening');
    axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
    fetchGetData('business');
  }, []);

  const history = useHistory();

  const handleOnClick = endpoint => history.push(endpoint);
  return (
    <>
      <p>
        Welcome back: {credentials.name}
      </p>
      <div>
        Business name: { (business !== null) ? (
          <div>
            <p> {business.name} </p>
            <button onClick={() => { handleOnClick('/business/raw_materials'); }} type="button">
              Raw Materials
            </button>
            <button onClick={() => { handleOnClick('/business/products'); }} type="button">
              Products
            </button>
          </div>
      ) : <BusinessComponent /> }
      </div>
    </>
  );
};

// I need to change this mapStateToProps
const mapStateToProps = state => ({
  credentials: state.authStore.credentials,
  loading: state.authStore.loading,
  isAuth: state.authStore.is_auth,
  business: state.dataStore.business,
});

const mapDispatchToProps = dispatch => ({
  fetchGetData: endpoint => dispatch(fetchGetData(endpoint)),
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
  fetchGetData: Proptypes.func.isRequired,
};

Home.defaultProps = {
  credentials: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
