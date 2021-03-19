/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useLayoutEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

// Have to figure it out whats defaulting my access

import { fetchGetRawMaterials, fetchRawMaterialRequestPost } from '../redux/actions/data';
// import styles from './RawMaterialsListComponent.module.css';
import RawMaterialComponent from '../components/setters/RawMaterialComponent';
import ModalComponent from '../components/Modal';
import ErrorHandler from '../components/ErrorHandler';
import GlobalCircularProgressComponent from '../components/getters/GlobalCircularProgress';
import NavBar from '../components/NavBar';
import { retrieveItem } from '../helpers';
import styles from './RawMaterialsListComponent.module.css';

const RawMaterialsListComponent = ({
  fetchGetRawMaterials,
  rawMaterials,
  isAuth,
  business,

}) => {
  let businessID;

  const [rawMaterial, setRawMaterial] = useState('');
  const [showIncrease, setShowIncrease] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showDecrease, setShowDecrease] = useState(false);
  const handleCloseIncrease = () => setShowIncrease(false);
  const handleShowIncrease = rawMaterialSelected => {
    setRawMaterial(rawMaterialSelected);
    console.log(`rawMaterial ${rawMaterialSelected.id}`);
    setShowIncrease(true);
  };

  const handleCloseDecrease = () => setShowDecrease(false);
  const handleShowDecrease = rawMaterialSelected => {
    setRawMaterial(rawMaterialSelected);
    console.log(`rawMaterial ${rawMaterialSelected.id}`);
    setShowDecrease(true);
  };

  if (isAuth === false) {
    return (
      <>
        <ErrorHandler errorMessage="Session expired" />
      </>
    );
  }
  useLayoutEffect(() => {
    (retrieveItem('businessID')) ? businessID = retrieveItem('businessID') : businessID = false;
    if (businessID !== false) fetchGetRawMaterials(`business/${business.id}/raw_materials`);
  }, []);
  return (rawMaterials.length >= 1) ? (
    <div className={styles.mainContainer}>
      <NavBar />
      {rawMaterials.map(item => {
        console.log(`item id: ${item.id}`);
        return (
          <div className={styles.childContainer} key={`div${item.id}`}>
            <div className={styles.progressMainInfoContainer}>
              <GlobalCircularProgressComponent width="100%" rawMaterial={item} />
              <h2 className={styles.title} key={item.id}>{item.name}</h2>
            </div>
            <div className={styles.amountsContainer}>
              <div className={styles.pAmountContainer}>
                <p style={{ color: 'green' }}>{item.total_amount}</p>
                <p key={`totalAmount${item.id}`}>Total</p>
              </div>
              <div className={styles.pAmountContainer}>
                <p style={{ color: 'red' }}>{item.remaining_amount}</p>
                <p key={`remainingAmount${item.id}`}>Remaining</p>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <ModalComponent show={showIncrease} handleClose={handleCloseIncrease} handleShow={() => handleShowIncrease(item)} title="Increase" modalTitle="Increase quantity" child={<RawMaterialComponent update item={rawMaterial} />} />
              <ModalComponent id={styles.test} show={showDecrease} handleClose={handleCloseDecrease} handleShow={() => handleShowDecrease(item)} title="Decrease" modalTitle="Decrease quantity" child={<RawMaterialComponent update decrease item={rawMaterial} />} />
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div>
      <NavBar />
      <div>
        <ModalComponent show={show} handleClose={handleClose} handleShow={handleShow} title="Create a new Raw Material" modalTitle="Add a new Raw Material" child={<RawMaterialComponent />} />
      </div>
    </div>
  );
};

RawMaterialsListComponent.propTypes = {
  isAuth: Proptypes.bool.isRequired,
  fetchGetRawMaterials: Proptypes.func.isRequired,
  rawMaterials: Proptypes.arrayOf(Proptypes.shape({
    name: Proptypes.string,
    total_amount: Proptypes.number,
    remaining_amount: Proptypes.number,
  })).isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  rawMaterials: state.dataStore.raw_materials,
  isAuth: state.authStore.is_auth,
  business: state.dataStore.business,
});

const mapDispatchToProps = dispatch => ({
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
  fetchRawMaterialRequestPost: data => dispatch(fetchRawMaterialRequestPost(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialsListComponent);
