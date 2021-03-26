/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import buildLoader from '../components/Loader';
import { getRawMaterials } from '../redux/actions/materials';
import { getBusiness, getBusinessID } from '../redux/actions/business';
import { errorMessage, lowestMaterial, retrieveItem } from '../helpers';
import BusinessComponent from '../components/setters/BusinessComponent';
import GlobalCircularProgressComponent from '../components/getters/GlobalCircularProgress';
import ErrorHandler from '../components/ErrorHandler';
import NavBar from '../components/NavBar';
import styles from './Home.module.css';
import { setHeader } from '../api/helpers';

const Home = ({
  isFetching, authenticated, business, getBusiness, rawMaterials,
  getRawMaterials, error, getBusinessID,
}) => {
  if (isFetching === true && authenticated === false) {
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

  if (authenticated === false && error) {
    return (
      <>
        <ErrorHandler errorMessage={errorMessage(error)} />
      </>
    );
  }

  if (authenticated === false) {
    return (
      <>
        <ErrorHandler errorMessage="Session expired." />
      </>
    );
  }

  useEffect(() => {
    let authToken;
    (retrieveItem('token')) ? authToken = retrieveItem('token') : history.goBack();
    if (authToken === '') history.goBack();
    setHeader(authToken);
    if (authToken !== '')getBusiness('business');
    if (businessID !== false)getRawMaterials(`business/${businessID}/raw_materials`);
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

const mapStateToProps = state => ({
  error: state.errorStore.error,
  isFetching: state.fetchStore.isFetching,
  authenticated: state.authStore.authenticated,
  business: state.businessStore.business,
  rawMaterials: state.materialStore,
});

const mapDispatchToProps = dispatch => ({
  getBusiness: endpoint => dispatch(getBusiness(endpoint)),
  getRawMaterials: endpoint => dispatch(getRawMaterials(endpoint)),
  getBusinessID: () => dispatch(getBusinessID()),
});

Home.propTypes = {
  error: Proptypes.string.isRequired,
  rawMaterials: Proptypes.arrayOf(Proptypes.shape({
    name: Proptypes.string,
    total_amount: Proptypes.number,
    remaining_amount: Proptypes.number,
  })),
  getRawMaterials: Proptypes.func.isRequired,
  getBusinessID: Proptypes.func.isRequired,
  isFetching: Proptypes.bool.isRequired,
  authenticated: Proptypes.bool.isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }),
  getBusiness: Proptypes.func.isRequired,
};

Home.defaultProps = {
  rawMaterials: [],
  business: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
