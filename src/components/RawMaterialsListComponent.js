/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGetRawMaterials } from '../redux/actions/data';
import buildLoader from './Loader';

const RawMaterialsListComponent = ({
  fetchGetRawMaterials,
  rawMaterials,
  business,
  loading,
}) => {
  useEffect(() => {
    fetchGetRawMaterials(`business/${business.id}/raw_materials`);
  }, [rawMaterials]);

  (loading === true) ? buildLoader() : (
    <>
      {rawMaterials.map(element => (
        <p key={element.id}>
          {element.name}
        </p>
      ))}
    </>
  );
};

RawMaterialsListComponent.propTypes = {
  fetchGetRawMaterials: Proptypes.func.isRequired,
  rawMaterials: Proptypes.arrayOf(Proptypes.shape({
    name: Proptypes.string,
    total_amount: Proptypes.string,
    remaining_amount: Proptypes.string,
  })).isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
  loading: Proptypes.bool.isRequired,
};

const mapStateToProps = state => ({
  rawMaterials: state.dataStore.raw_materials,
  business: state.dataStore.business,
  loading: state.dataStore.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialsListComponent);
