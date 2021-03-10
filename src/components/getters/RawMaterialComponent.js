/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { VictoryPie } from 'victory';

import { fetchRawMaterialRequest } from '../../redux/actions/data';

const RawMaterialComponent = ({ rawMaterial }) => {
  useLayoutEffect(() => {
    fetchRawMaterialRequest();
  }, []);
  console.log(`raw material: ${rawMaterial.name}`);
  return (
    <>
      { (rawMaterial !== '') ? (
        <VictoryPie
          data={[
            { x: ` remaining amount: ${rawMaterial.remaining_amount}`, y: 20 },
            { x: ` total amount: ${rawMaterial.total_amount}`, y: 10 },
          ]}
          colorScale={['red', 'green']}
        />
      ) : <p> not working </p>}
    </>
  );
};

RawMaterialComponent.propTypes = {
  rawMaterial: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string,
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
