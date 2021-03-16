/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';

import { fetchGetRawMaterials } from '../../redux/actions/data';
import GlobalCircularProgressComponent from './GlobalCircularProgress';
import ErrorHandler from '../ErrorHandler';

const RawMaterialComponent = ({
  fetchGetRawMaterials,
  rawMaterial, business,
  isAuth,
}) => {
  if (isAuth === false) {
    return (
      <ErrorHandler errorMessage="Session expired" />
    );
  }
  useEffect(() => {
    fetchGetRawMaterials(`business/${business.id}/raw_materials`);
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
  isAuth: Proptypes.bool.isRequired,
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
  fetchGetRawMaterials: Proptypes.func.isRequired,
};

const mapStateToProps = state => ({
  rawMaterial: state.dataStore.raw_material,
  business: state.dataStore.business,
  isAuth: state.authStore.is_auth,
});

const mapDispatchToProps = dispatch => ({
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialComponent);
