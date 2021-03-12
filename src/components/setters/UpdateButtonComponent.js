/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Proptypes from 'prop-types';

const UpdateButton = ({ name, handleOnClick }) => (
  <>
    <button onClick={handleOnClick} type="button"> Update {name} </button>
  </>
);

UpdateButton.propTypes = {
  name: Proptypes.string.isRequired,
  handleOnClick: Proptypes.func.isRequired,
};

export default UpdateButton;
