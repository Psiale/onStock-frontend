/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useLayoutEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Multiselect } from 'multiselect-react-dropdown';

import { fetchGetRawMaterials, fetchPostProductMaterials } from '../redux/actions/data';
import RawMaterialComponent from './setters/RawMaterialComponent';
import { extractID } from '../helpers';

const RawMaterialsListComponent = ({
  fetchGetRawMaterials,
  rawMaterials,
  business,
  fetchPostProductMaterials,
}) => {
  useLayoutEffect(() => {
    fetchGetRawMaterials(`business/${business.id}/raw_materials`);
  }, []);
  const selectedMaterials = useRef();
  const [selectedItems, setSelectedItems] = useState([{ product_raw_materials: [] }]);
  const handleSelect = () => {
    console.log(selectedMaterials.current.getSelectedItems().map(element => extractID(element)));
    setSelectedItems({ product_raw_materials: selectedMaterials.current.getSelectedItems() });
    console.log(selectedItems);
  };

  const handleOnClick = () => {
    fetchPostProductMaterials(`business/${business.id}/products/3/raw_materials`, {
      product_raw_materials: selectedItems,
    });
  };

  return (rawMaterials !== null) ? (
    <>
      {rawMaterials.map(items => <p key={items.id}>{items.name}</p>)}
      <Multiselect
        options={rawMaterials}
        displayValue="name"
        closeOnSelect="false"
        ref={selectedMaterials}
        onSelect={handleSelect}
      />
      <button type="button" onClick={handleOnClick}>
        save product
      </button>
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
  fetchPostProductMaterials: Proptypes.func.isRequired,
};

const mapStateToProps = state => ({
  rawMaterials: state.dataStore.raw_materials,
  business: state.dataStore.business,
});

const mapDispatchToProps = dispatch => ({
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
  fetchPostProductMaterials:
  (endpoint, data) => dispatch(fetchPostProductMaterials(endpoint, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialsListComponent);
