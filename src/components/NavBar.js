/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import RawMaterialComponent from './setters/RawMaterialComponent';
import ModalComponent from './Modal';
import { retrieveItem } from '../helpers';

const NavBar = ({ initialState }) => {
  let businessID;
  useEffect(() => {
    (retrieveItem('businessID')) ? businessID = retrieveItem('businessID') : businessID = false;
  }, []);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    history.push('/business/raw_materials');
  };
  const handleShow = () => setShow(true);
  const handleOnClick = enpoint => {
    initialState();
    history.push(enpoint);
  };
  return (
    <>
      <button type="button" onClick={() => handleOnClick('/')}> Sign out</button>
      {(businessID !== false)
        ? <ModalComponent show={show} handleClose={handleClose} handleShow={handleShow} title="Create a new Raw Material" modalTitle="Add a new Raw Material" child={<RawMaterialComponent />} /> : null}
      <button type="button" onClick={() => handleOnClick('/business/raw_materials')}> Inventory</button>
    </>
  );
};

NavBar.propTypes = {
  initialState: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  initialState: () => dispatch({ type: 'DEFAULT' }),
});

export default connect(null, mapDispatchToProps)(NavBar);
