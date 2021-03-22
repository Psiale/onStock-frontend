/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import buildLoader from '../components/Loader';
// import styles from './Home.module.css';
import { fetchBusinessGetData, fetchGetRawMaterials } from '../redux/actions/data';
import { lowestMaterial, retrieveItem } from '../helpers';
import BusinessComponent from '../components/setters/BusinessComponent';
import GlobalCircularProgressComponent from '../components/getters/GlobalCircularProgress';
import ErrorHandler from '../components/ErrorHandler';
import NavBar from '../components/NavBar';
import { getBusinessID } from '../redux/actions/auth';
import styles from './Home.module.css';
import { setHeader } from '../api/helpers';

const Home = ({
  loading, isAuth, business, fetchBusinessGetData, rawMaterials,
  fetchGetRawMaterials, error, getBusinessID,
}) => {
  if (loading === true && isAuth === false) {
    return buildLoader();
  }

  const history = useHistory();
  let businessID;
  (retrieveItem('businessID')) ? businessID = retrieveItem('businessID') : businessID = false;
  const hasRawMaterials = (materials, material) => {
    if (materials !== null) {
      return (
        <div className={styles.circularInfoContainer}> 
          <div className={styles.lowestMaterialinfoContainer}>
            <GlobalCircularProgressComponent width="80%" rawMaterial={material} />
            <div className={styles.pMaterialContainer}>
              <div className={styles.pChildContainer}>
                <p style={{ color: 'red' }}>{material.remaining_amount}</p>
                <p>Remainig</p>
              </div>
            </div>
          </div>

          <div className={styles.infoContainer}>
            <h2>{material.name} </h2>
            <p> Has the lowest amount on stock</p>
          </div>
        </div>
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
        <ErrorHandler errorMessage="Missing or Wrong Credentials" />
      </>
    );
  }

  useEffect(() => {
    let authToken;
    (retrieveItem('token')) ? authToken = retrieveItem('token').replace(/['"]+/g, '') : history.goBack();
    if (authToken === '') history.goBack();
    setHeader(authToken);
    if (authToken !== '')fetchBusinessGetData('business');
    if (businessID !== false)fetchGetRawMaterials(`business/${businessID}/raw_materials`);
    if (businessID !== false) getBusinessID();
  }, []);
  return (
    <>
      <div className={styles.businessContainer}>
        { (business !== null) ? (
          
          <div className={styles.mainContainer}>
            <NavBar />
            <div className={styles.mainTitle}>
              <h1> {business.name} </h1>
            </div>
            {(rawMaterials && rawMaterials.length > 0)
            // have to solve out this call
              ? hasRawMaterials(rawMaterials, lowestMaterial(rawMaterials)) : null } 
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
  getBusinessID: () => dispatch(getBusinessID()),
});

Home.propTypes = {
  error: Proptypes.string.isRequired,
  rawMaterials: Proptypes.arrayOf(Proptypes.shape({
    name: Proptypes.string,
    total_amount: Proptypes.number,
    remaining_amount: Proptypes.number,
  })),
  fetchGetRawMaterials: Proptypes.func.isRequired,
  getBusinessID: Proptypes.func.isRequired,
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
