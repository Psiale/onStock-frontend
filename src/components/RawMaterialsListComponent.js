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
  const [rawMaterial, setRawMaterial] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = rawMaterialSelected => {
    setRawMaterial(rawMaterialSelected);
    console.log(`rawMaterial ${rawMaterialSelected.id}`);
    setShowUpdate(true);
  };

  const selectedMaterials = useRef();
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelect = () => {
    setSelectedItems(selectedMaterials.current.getSelectedItems()
      .map(element => extractID(element)));
    console.log(selectedItems);
  };

  const handleOnClick = rawMaterial => {
    fetchGetRawMaterials(`business/${business.id}/raw_materials`);
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
      {rawMaterials.map(item => {
        console.log(`item id: ${item.id}`);
        return (
          <div key={`div${item.id}`}>
            <p key={item.id}>{item.name}</p>
            <button type="button" onClick={() => handleOnClick(item)} key={`button${item.id}`}> more </button>
            <ModalComponent show={showUpdate} handleClose={handleCloseUpdate} handleShow={() => handleShowUpdate(item)} title="Update Raw Material" modalTitle="Update Material" child={<RawMaterialComponent update item={rawMaterial} />} />
          </div>
        );
      })}
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
