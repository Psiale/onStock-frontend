/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useLayoutEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchGetRawMaterials, fetchRawMaterialRequestPost } from '../redux/actions/data';
// import styles from './RawMaterialsListComponent.module.css';
import RawMaterialComponent from '../components/setters/RawMaterialComponent';
import ModalComponent from '../components/Modal';
import ErrorHandler from '../components/ErrorHandler';
import GlobalCircularProgressComponent from '../components/getters/GlobalCircularProgress';
import NavBar from '../components/NavBar';

const RawMaterialsListComponent = ({
  fetchGetRawMaterials,
  rawMaterials,
  business,
  isAuth,
  fetchRawMaterialRequestPost,

}) => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [rawMaterial, setRawMaterial] = useState('');
  const [showIncrease, setShowIncrease] = useState(false);
  const [showDecrease, setShowDecrease] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const handleOnClick = rawMaterial => {
    fetchGetRawMaterials(`business/${business.id}/raw_materials`);
    fetchRawMaterialRequestPost(rawMaterial);
    history.push(`/rawMaterial/${rawMaterial.id}`);
  };

  if (isAuth === false) {
    return (
      <>
        <ErrorHandler errorMessage="Session expired" />
      </>
    );
  }
  useLayoutEffect(() => {
    if (isAuth) fetchGetRawMaterials(`business/${business.id}/raw_materials`);
  }, []);
  return (rawMaterials !== []) ? (
    <>
      <NavBar />
      {rawMaterials.map(item => {
        console.log(`item id: ${item.id}`);
        return (
          <div key={`div${item.id}`}>
            <GlobalCircularProgressComponent rawMaterial={item} />
            <p key={item.id}>{item.name}</p>
            <p key={`totalAmount${item.id}`}>Total Amount: {item.total_amount}</p>
            <p key={`remainingAmount${item.id}`}>Remaining Amount: {item.remaining_amount}</p>
            <ModalComponent show={showIncrease} handleClose={handleCloseIncrease} handleShow={() => handleShowIncrease(item)} title="Increase amount" modalTitle="Increase quantity" child={<RawMaterialComponent update item={rawMaterial} />} />
            <ModalComponent show={showDecrease} handleClose={handleCloseDecrease} handleShow={() => handleShowDecrease(item)} title="Decrease amount" modalTitle="Decrease quantity" child={<RawMaterialComponent update decrease item={rawMaterial} />} />
          </div>
        );
      })}
      <button type="button" onClick={handleOnClick}>
        save product
      </button>
      <ModalComponent show={show} handleClose={handleClose} handleShow={handleShow} title="Create a new Raw Material" modalTitle="Add a new Raw Material" child={<RawMaterialComponent />} />
    </>
  ) : (
    <div>
      <NavBar />
      <ModalComponent show={show} handleClose={handleClose} handleShow={handleShow} title="Create a new Raw Material" modalTitle="Add a new Raw Material" child={<RawMaterialComponent />} />
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
  fetchRawMaterialRequestPost: Proptypes.func.isRequired,
};

const mapStateToProps = state => ({
  rawMaterials: state.dataStore.raw_materials,
  business: state.dataStore.business,
  isAuth: state.authStore.is_auth,
});

const mapDispatchToProps = dispatch => ({
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
  fetchRawMaterialRequestPost: data => dispatch(fetchRawMaterialRequestPost(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialsListComponent);
