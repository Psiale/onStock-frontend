import React, { useEffect } from 'react-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGetRawMaterials } from '../redux/actions/data';

const RawMaterialsListComponent = ({ fetchGetRawMaterials, rawMaterials }) => {
  useEffect(() => {
    fetchGetRawMaterials();
  }, []);

  return (
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
};

const mapStateToProps = state => ({
  rawMaterials: state.dataStore.raw_materials,
});

const mapDispatchToProps = dispatch => ({
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialsListComponent);
