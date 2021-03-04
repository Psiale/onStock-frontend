/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import axios from 'axios';
import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGetData } from '../../redux/actions/data';
// import { createInput } from '../../helpers';

const GetProductComponent = ({ authToken, fetchGetData }) => {
  // working on the dynamic creation of state using the inputs array
  const handleOnClick = () => {
    fetchGetData('business');
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
  authToken: Proptypes.string.isRequired,
  fetchGetData: Proptypes.func.isRequired,
};

const mapStateToProps = state => ({
  authToken: state.authStore.auth_token,
});

const mapDispatchToProps = dispatch => ({
  fetchGetData: endpoint => dispatch(fetchGetData(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetProductComponent);
