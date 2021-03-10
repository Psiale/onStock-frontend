/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from 'react';
import Proptypes from 'prop-types';

const RawMaterialComponent = ({ rawMaterial }) => {
  useLayoutEffect(() => {
    //
  }, []);

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

export default RawMaterialComponent;
