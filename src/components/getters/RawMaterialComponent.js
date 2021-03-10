/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRawMaterialRequest } from '../../redux/actions/data';

const RawMaterialComponent = ({ rawMaterial }) => {
  useLayoutEffect(() => {
    fetchRawMaterialRequest();
  }, []);
  console.log(`raw material: ${rawMaterial.name}`);
  return (
    <>
      { (rawMaterial !== '') ? <p> Raw material :D </p> : <p> not working </p>}
    </>
  );
};

RawMaterialComponent.propTypes = {
  rawMaterial: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  rawMaterial: state.dataStore.raw_material,
});

const mapDispatchToProps = dispatch => ({
  fetchRawMaterialRequest: () => dispatch(fetchRawMaterialRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialComponent);
