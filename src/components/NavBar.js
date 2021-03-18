import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import RawMaterialComponent from './setters/RawMaterialComponent';
import ModalComponent from './Modal';
import { retrieveItem } from '../helpers';

const NavBar = ({ initialState }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnClick = () => {
    initialState();
    history.push('/');
  };
  // have to check this out
  let businessID;
  // eslint-disable-next-line no-unused-expressions
  (retrieveItem('businessID')) ? businessID = retrieveItem('businessID') : businessID = false;
  return (
    <>
      <button type="button" onClick={handleOnClick}> Sign out</button>
      {(businessID !== false)
        ? <ModalComponent show={show} handleClose={handleClose} handleShow={handleShow} title="Create a new Raw Material" modalTitle="Add a new Raw Material" child={<RawMaterialComponent />} /> : null}
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
