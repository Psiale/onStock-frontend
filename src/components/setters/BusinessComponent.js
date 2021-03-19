/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { fetchPostData } from '../../redux/actions/data';
import { createInput } from '../../helpers';

const BusinessComponent = ({ fetchPostData }) => {
  const [values, setValues] = useState({
    name: '',
  });
  const history = useHistory();

  const handleSubmit = () => {
    fetchPostData('business',
      {
        name: values.name,
        avatar: 'default value',
      });
    history.push('/business/raw_materials');
  };
  const handleChange = evt => {
    const { value } = evt.target;
    setValues({
      ...values,
      [evt.target.name]: value,
    });

    console.log(values);
  };

  console.log(axios.defaults.headers.common);

  return (
    <div>
      <span> No Business Yet :c </span>
      <form onSubmit={handleSubmit}>
        {createInput('name', values.name, handleChange)}
        <input type="submit" value="Create Business" />
      </form>
    </div>
  );
};

BusinessComponent.propTypes = {
  fetchPostData: Proptypes.func.isRequired,
};

const mapStateToProps = state => ({
  authToken: state.authStore.auth_token,
  loading: state.dataStore.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchPostData: (endpoint, data) => dispatch(fetchPostData(endpoint, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessComponent);
