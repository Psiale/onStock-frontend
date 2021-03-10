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
  loading, isAuth, business, fetchGetData,
}) => {
  if (loading === true && isAuth === false) {
    return buildLoader();
  }
  const history = useHistory();
  useLayoutEffect(() => {
    const authToken = retrieveItem('token').replace(/['"]+/g, '');
    console.log(authToken);
    if (authToken === '') history.goBack();
    axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
    fetchGetData('business');
  }, []);

  const handleOnClick = endpoint => history.push(endpoint);
  return (
    <>
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
  loading: state.authStore.loading,
  isAuth: state.authStore.is_auth,
  business: state.dataStore.business,
});

const mapDispatchToProps = dispatch => ({
  fetchGetData: endpoint => dispatch(fetchGetData(endpoint)),
});

Home.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
