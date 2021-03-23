/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useLayoutEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import { getRawMaterials, postRawMaterials } from '../redux/actions/materials';
import RawMaterialComponent from '../components/setters/RawMaterialComponent';
import ModalComponent from '../components/Modal';
import ErrorHandler from '../components/ErrorHandler';
import GlobalCircularProgressComponent from '../components/getters/GlobalCircularProgress';
import NavBar from '../components/NavBar';
import { retrieveItem } from '../helpers';
import styles from './RawMaterialsListComponent.module.css';

const RawMaterialsListComponent = ({
  getRawMaterials,
  rawMaterials,
  authenticated,
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
    setShowIncrease(true);
  };

  const handleCloseDecrease = () => setShowDecrease(false);
  const handleShowDecrease = rawMaterialSelected => {
    setRawMaterial(rawMaterialSelected);
    setShowDecrease(true);
  };

  if (authenticated === false) {
    return (
      <>
        <ErrorHandler errorMessage="Session expired" />
      </>
    );
  }
  useLayoutEffect(() => {
    (retrieveItem('businessID')) ? businessID = retrieveItem('businessID') : businessID = false;
    if (businessID !== false) getRawMaterials(`business/${business.id}/raw_materials`);
  }, [showIncrease, showDecrease]);
  return (rawMaterials.length >= 1) ? (
    <div className={styles.mainContainer}>
      <NavBar />
      {rawMaterials.map(item => (
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
      ))}
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
  authenticated: Proptypes.bool.isRequired,
  getRawMaterials: Proptypes.func.isRequired,
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
  rawMaterials: state.materialStore.raw_materials,
  authenticated: state.authStore.authenticated,
  business: state.businessStore.business,
});

const mapDispatchToProps = dispatch => ({
  getRawMaterials: endpoint => dispatch(getRawMaterials(endpoint)),
  postRawMaterials: data => dispatch(postRawMaterials(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialsListComponent);
