/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useLayoutEffect, useRef } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Multiselect } from 'multiselect-react-dropdown';

import { fetchGetRawMaterials } from '../redux/actions/data';
import RawMaterialComponent from './setters/RawMaterialComponent';

const RawMaterialsListComponent = ({
  fetchGetRawMaterials,
  rawMaterials,
  business,
}) => {
  useLayoutEffect(() => {
    fetchGetRawMaterials(`business/${business.id}/raw_materials`);
  }, []);
  const selectedMaterials = useRef();
  const handleSelect = () => {
    selectedMaterials.current.getSelectedItems();
    console.log(selectedMaterials.current.getSelectedItems());
  };
  return (rawMaterials !== null) ? (
    <>
      {rawMaterials.map(items => <p key={items.id}>{items.name}</p>)}
      <Multiselect
        options={rawMaterials}
        displayValue="name"
        ref={selectedMaterials}
        onSelect={handleSelect}
      />
      <p> Testing </p>
      <RawMaterialComponent />
    </>
  ) : (
    <div>
      <RawMaterialComponent />
    </div>
  );
};

RawMaterialsListComponent.propTypes = {
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
  business: state.dataStore.business,
});

const mapDispatchToProps = dispatch => ({
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialsListComponent);
