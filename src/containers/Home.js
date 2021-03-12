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
import { fetchBusinessGetData, fetchGetRawMaterials } from '../redux/actions/data';
import { retrieveItem } from '../helpers';
import BusinessComponent from '../components/setters/BusinessComponent';

const Home = ({
  loading, isAuth, business, fetchBusinessGetData, rawMaterials, fetchGetRawMaterials
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
    fetchBusinessGetData('business');
    if (rawMaterials !== [] && business !== null) {
      fetchGetRawMaterials(`business/${business.id}/raw_materials`);
    }
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
  rawMaterials: state.dataStore.raw_materials,
});

const mapDispatchToProps = dispatch => ({
  fetchBusinessGetData: endpoint => dispatch(fetchBusinessGetData(endpoint)),
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
});

Home.propTypes = {
  fetchGetRawMaterials: Proptypes.func.isRequired,
  loading: Proptypes.bool.isRequired,
  isAuth: Proptypes.bool.isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
  fetchBusinessGetData: Proptypes.func.isRequired,
  rawMaterials: Proptypes.arrayOf(Proptypes.shape({
    name: Proptypes.string,
    total_amount: Proptypes.number,
    remaining_amount: Proptypes.number,
  })),
};

Home.defaultProps = {
  rawMaterials: [],
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
