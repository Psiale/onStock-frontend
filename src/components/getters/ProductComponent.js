/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import axios from 'axios';
import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import fetchGetProducts from '../../redux/actions/data';
// import { createInput } from '../../helpers';

const GetProductComponent = ({ inputs, authToken, fetchGetProducts }) => {
  // working on the dynamic creation of state using the inputs array
  const handleOnClick = () => {
    fetchGetProducts('business');
  };
  axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
  return (
    <>
      <button onClick={handleOnClick} type="button">
        get all products
      </button>
    </>
  );
};

GetProductComponent.propTypes = {
  inputs: Proptypes.arrayOf(Proptypes.string).isRequired,
  authToken: Proptypes.string.isRequired,
  fetchGetProducts: Proptypes.func.isRequired,
};

const mapStateToProps = state => ({
  authToken: state.authStore.auth_token,
});

const mapDispatchToProps = dispatch => ({
  fetchGetProducts: endpoint => dispatch(fetchGetProducts(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetProductComponent);
