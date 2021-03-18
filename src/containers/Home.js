/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import buildLoader from '../components/Loader';
// import styles from './Home.module.css';
import { fetchBusinessGetData, fetchGetRawMaterials } from '../redux/actions/data';
import { lowestMaterial, retrieveItem } from '../helpers';
import BusinessComponent from '../components/setters/BusinessComponent';
import GlobalCircularProgressComponent from '../components/getters/GlobalCircularProgress';
import ErrorHandler from '../components/ErrorHandler';
import NavBar from '../components/NavBar';

const Home = ({
  loading, isAuth, business, fetchBusinessGetData, rawMaterials,
  fetchGetRawMaterials, error,
}) => {
  if (loading === true && isAuth === false) {
    return buildLoader();
  }

  const history = useHistory();
  let businessID;
  (retrieveItem('businessID')) ? businessID = retrieveItem('businessID') : businessID = false;

  const handleOnClick = endpoint => history.push(endpoint);
  const hasRawMaterials = (materials, material) => {
    console.log(material);
    if (materials !== null) {
      return (
        <> 
          <GlobalCircularProgressComponent rawMaterial={material} />
        </>
      );
    }
    return null;
  };

  if (isAuth === false && error) {
    return (
      <>
        <ErrorHandler errorMessage="Missing or Wrong Credentials" />
      </>
    );
  }

  if (isAuth === false) {
    return (
      <>
        <ErrorHandler errorMessage="Session expired" />
      </>
    );
  }

  useEffect(() => {
    let authToken;
    (retrieveItem('token')) ? authToken = retrieveItem('token').replace(/['"]+/g, '') : history.goBack();
    if (authToken === '') history.goBack();
    axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
    fetchBusinessGetData('business');
    if (businessID !== false)fetchGetRawMaterials(`business/${businessID}/raw_materials`);
  }, []);
  return (
    <>
      <div>
        { (business !== null) ? (
          
          <div>
            <NavBar />
            <p> {business.name} </p>
            {(rawMaterials && rawMaterials.length > 0)
            // have to solve out this call
              ? hasRawMaterials(rawMaterials, lowestMaterial(rawMaterials)) : null } 
            <button onClick={() => { handleOnClick('/business/raw_materials'); }} type="button">
              Raw Materials
            </button>
          </div>
        ) 
          : (
            <div>
              <NavBar />
              <BusinessComponent />
            </div>
          ) }
      </div>
    </>
  );
};

// I need to change this mapStateToProps
const mapStateToProps = state => ({
  error: state.authStore.error,
  loading: state.authStore.loading,
  isAuth: state.authStore.is_auth,
  business: state.dataStore.business,
  rawMaterials: state.dataStore.raw_materials,
  has_Materials: state.dataStore.has_materials,
});

const mapDispatchToProps = dispatch => ({
  fetchBusinessGetData: endpoint => dispatch(fetchBusinessGetData(endpoint)),
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
});

Home.propTypes = {
  error: Proptypes.string.isRequired,
  rawMaterials: Proptypes.arrayOf(Proptypes.shape({
    name: Proptypes.string,
    total_amount: Proptypes.number,
    remaining_amount: Proptypes.number,
  })),
  fetchGetRawMaterials: Proptypes.func.isRequired,
  loading: Proptypes.bool.isRequired,
  isAuth: Proptypes.bool.isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }),
  fetchBusinessGetData: Proptypes.func.isRequired,
  // rawMaterials: Proptypes.arrayOf(Proptypes.shape({
  //   name: Proptypes.string,
  //   total_amount: Proptypes.number,
  //   remaining_amount: Proptypes.number,
  // })),
};

Home.defaultProps = {
  rawMaterials: [],
  business: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
