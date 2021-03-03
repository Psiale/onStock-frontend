import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';

const PostComponent = ({ inputs, authToken }) => {
  axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
  return (
    <>

    </>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);
