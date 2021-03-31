/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getRawMaterials, postRawMaterials } from '../redux/actions/materials';
import RawMaterialComponent from '../components/setters/RawMaterialComponent';
import ModalComponent from '../components/Modal';
import GlobalCircularProgressComponent from '../components/getters/GlobalCircularProgress';
import NavBar from '../components/NavBar';
import { setNavBarModal, setDecreaseModal, setIncreaseModal } from '../redux/actions/modal';
import { retrieveItem } from '../helpers';
import styles from './RawMaterialsListComponent.module.css';

const RawMaterialsListComponent = ({
  getRawMaterials,
  rawMaterials,
  authenticated,
  setNavBarModal,
  setDecreaseModal, setIncreaseModal,
  navBarIsShowing,
  increaseIsShowing,
  decreaseIsShowing,
}) => {
  let businessID;
  const history = useHistory();

  const [rawMaterial, setRawMaterial] = useState('');
  const [showIncrease, setShowIncrease] = useState(false);
  const handleClose = () => setNavBarModal(false);
  const handleShow = () => setNavBarModal(true);
  const [showDecrease, setShowDecrease] = useState(false);
  const handleCloseIncrease = () => {
    setShowIncrease(false);
    setIncreaseModal(false);
  };
  const handleShowIncrease = rawMaterialSelected => {
    setRawMaterial(rawMaterialSelected);
    setShowIncrease(true);
    setIncreaseModal(true);
  };

  const handleCloseDecrease = () => {
    setShowDecrease(false);
    setDecreaseModal(false);
  };
  const handleShowDecrease = rawMaterialSelected => {
    setRawMaterial(rawMaterialSelected);
    setShowDecrease(true);
    setDecreaseModal(true);
  };

  if (authenticated === false) {
    history.goBack();
  }
  useEffect(() => {
    (retrieveItem('businessID')) ? businessID = retrieveItem('businessID') : businessID = false;
    if (businessID !== false) getRawMaterials(`business/${businessID}/raw_materials`);
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
            <ModalComponent show={increaseIsShowing} handleClose={handleCloseIncrease} handleShow={() => handleShowIncrease(item)} title="Increase" modalTitle="Increase quantity" child={<RawMaterialComponent update item={rawMaterial} />} />
            <ModalComponent id={styles.test} show={decreaseIsShowing} handleClose={handleCloseDecrease} handleShow={() => handleShowDecrease(item)} title="Decrease" modalTitle="Decrease quantity" child={<RawMaterialComponent update decrease item={rawMaterial} />} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <NavBar />
      <div>
        <ModalComponent show={navBarIsShowing} handleClose={handleClose} handleShow={handleShow} title="Create a new Raw Material" modalTitle="Add a new Raw Material" child={<RawMaterialComponent />} />
      </div>
    </div>
  );
};

RawMaterialsListComponent.propTypes = {
  decreaseIsShowing: Proptypes.bool.isRequired,
  increaseIsShowing: Proptypes.bool.isRequired,
  navBarIsShowing: Proptypes.bool.isRequired,
  authenticated: Proptypes.bool.isRequired,
  setNavBarModal: Proptypes.func.isRequired,
  setDecreaseModal: Proptypes.func.isRequired,
  setIncreaseModal: Proptypes.func.isRequired,
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
  rawMaterials: state.materialStore,
  authenticated: state.authStore.authenticated,
  business: state.businessStore.business,
  navBarIsShowing: state.modalStore.navBarIsShowing,
  decreaseIsShowing: state.modalStore.decreaseIsShowing,
  increaseIsShowing: state.modalStore.increaseIsShowing,
});

const mapDispatchToProps = dispatch => ({
  getRawMaterials: endpoint => dispatch(getRawMaterials(endpoint)),
  postRawMaterials: data => dispatch(postRawMaterials(data)),
  setNavBarModal: isShowing => dispatch(setNavBarModal(isShowing)),
  setDecreaseModal: isShowing => dispatch(setDecreaseModal(isShowing)),
  setIncreaseModal: isShowing => dispatch(setIncreaseModal(isShowing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialsListComponent);
