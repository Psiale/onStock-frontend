import axios from 'axios';
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import fetchGetProducts from '../redux/actions/data';
import { createInput } from '../helpers';

const PostComponent = ({ inputs, authToken, fetchGetProducts }) => {
  // working on the dynamic creation of state using the inputs array
  const setInitialState = properties => {
    const initialState = {}
    properties.map(property => {
      
    });
  }
  const handleSubmit = () => {};
  axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
  return (
    <>
    <form onSubmit={ handleSubmit }>
      {inputs.map(input => {
        createInput(input)
      })}
    </form>
    </>
  );
};

PostComponent.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);
