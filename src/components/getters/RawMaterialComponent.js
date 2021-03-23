/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';

import { getRawMaterials } from '../../redux/actions/materials';
import GlobalCircularProgressComponent from './GlobalCircularProgress';
import ErrorHandler from '../ErrorHandler';

const RawMaterialComponent = ({
  getRawMaterials,
  rawMaterial, business,
  authenticated,
}) => {
  if (authenticated === false) {
    return (
      <ErrorHandler errorMessage="Session expired" />
    );
  }
  useEffect(() => {
    getRawMaterials(`business/${business.id}/raw_materials`);
  }, []);
  return (
    <>
      { (rawMaterial !== '') ? (
        <>
          <GlobalCircularProgressComponent rawMaterial={rawMaterial} />
        </>
      ) : <p> not working </p>}
    </>
  );
};

RawMaterialComponent.propTypes = {
  authenticated: Proptypes.bool.isRequired,
  rawMaterial: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string,
    owner_id: Proptypes.number,
  }).isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
  getRawMaterials: Proptypes.func.isRequired,
};

const mapStateToProps = state => ({
  rawMaterial: state.dataStore.raw_material,
  business: state.businessStore.business,
  authenticated: state.authStore.authenticated,
});

const mapDispatchToProps = dispatch => ({
  getRawMaterials: endpoint => dispatch(getRawMaterials(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialComponent);
