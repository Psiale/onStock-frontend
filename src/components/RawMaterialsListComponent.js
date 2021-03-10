/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useLayoutEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';

import { fetchGetRawMaterials, fetchRawMaterialRequestPost } from '../redux/actions/data';
import RawMaterialComponent from './setters/RawMaterialComponent';
import { extractID } from '../helpers';
import ModalComponent from './Modal';

const RawMaterialsListComponent = ({
  fetchGetRawMaterials,
  rawMaterials,
  business,
  isAuth,
  fetchRawMaterialRequestPost,

}) => {
  const history = useHistory();
  useLayoutEffect(() => {
    fetchGetRawMaterials(`business/${business.id}/raw_materials`);
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectedMaterials = useRef();
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelect = () => {
    setSelectedItems(selectedMaterials.current.getSelectedItems()
      .map(element => extractID(element)));
    console.log(selectedItems);
  };

  const handleOnClick = rawMaterial => {
    fetchRawMaterialRequestPost(rawMaterial);
    history.push(`/rawMaterial/${rawMaterial.id}`);
  };

  if (isAuth === false) {
    return (
      <>
        <p> Missing Credentials</p>
        <button onClick={history.push('/')} type="button">
          Login / Signup
        </button>
      </>
    );
  }
  return (rawMaterials !== []) ? (
    <>
      {rawMaterials.map(item => (
        <div key={`div${item.id}`}>
          <p key={item.id}>{item.name}</p>
          <button type="button" onClick={() => handleOnClick(item)} key={`button${item.id}`}> </button>
        </div>
      ))}
      <Multiselect
        options={rawMaterials}
        displayValue="name"
        closeOnSelect={false}
        ref={selectedMaterials}
        onSelect={handleSelect}
      />
      <button type="button" onClick={handleOnClick}>
        save product
      </button>
      <ModalComponent show={show} handleClose={handleClose} handleShow={handleShow} title="Create a new Raw Material" modalTitle="Add a new Raw Material" child={<RawMaterialComponent />} />
    </>
  ) : (
    <div>
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
