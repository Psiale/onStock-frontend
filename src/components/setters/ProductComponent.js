/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import axios from 'axios';
import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
// import fetchGetProducts from '../../redux/actions/data';
// import { createInput } from '../../helpers';

const PostProductComponent = ({ authToken }) => {
  // working on the dynamic creation of state using the inputs array
//   const setInitialState = properties => {
//     const initialState = {};
//     properties.map(property => initialState[property] = '');
//     return initialState;
//   };

  // const [values, setValues] = (setInitialState(inputs));
  // console.log(values);
  const handleSubmit = () => {};
  axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
  return (
    <>
      <form onSubmit={handleSubmit} />
    </>
  );
};

PostProductComponent.propTypes = {
  authToken: Proptypes.string.isRequired,
};

const mapStateToProps = state => ({
  authToken: state.authStore.auth_token,
});

export default connect(mapStateToProps, null)(PostProductComponent);
