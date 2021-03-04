/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import axios from 'axios';
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { fetchPostRawMaterials } from '../../redux/actions/data';
import { createInput } from '../../helpers';
// import buildLoader from '../Loader';

const BusinessComponent = ({ fetchPostRawMaterials }) => {
  const [values, setValues] = useState({
    name: '',
    totalAmount: '',
  });
  // const history = useHistory();

  const handleSubmit = event => {
    console.log(axios.defaults.headers.common);
    // Im sending a wrong request, Im creating a new business when I should be creating a new raw material
    fetchPostRawMaterials('business',
      {
        name: values.name,
        totalAmount: values.totalAmount,
        remainingAmount: values.totalAmount,
      }).then(
      event.preventDefault(),
      console.log(
        {
          name: values.name,
          totalAmount: values.totalAmount,
          remainingAmount: values.totalAmount,
        },
      ),
    );
  };
  const handleChange = evt => {
    const { value } = evt.target;
    setValues({
      ...values,
      [evt.target.name]: value,
    });

    console.log(values);
  };

  return (
    <>
      <span> You have no Raw Materials :c </span>
      <form onSubmit={handleSubmit}>
        {createInput('name', values.name, handleChange)}
        {createInput('totalAmount', values.totalAmount, handleChange)}
        <input type="submit" value="Create Raw Material" />
      </form>
    </>
  );
};

BusinessComponent.propTypes = {
  fetchPostRawMaterials: Proptypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.dataStore.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchPostRawMaterials: (endpoint, data) => dispatch(fetchPostRawMaterials(endpoint, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessComponent);
