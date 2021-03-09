/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import axios from 'axios';
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { fetchPostProducts } from '../../redux/actions/data';
import { createInput } from '../../helpers';
// import buildLoader from '../Loader';

const ProductComponent = ({ fetchPostProducts, business }) => {
  const [values, setValues] = useState({
    name: '',
    cost: '',
  });
  // const history = useHistory();

  const handleSubmit = event => {
    console.log(axios.defaults.headers.common);
    // Im sending a wrong request,
    // Im creating a new business when I should be creating a new raw material
    fetchPostProducts(`business/${business.id}/products`,
      {
        name: values.name,
        cost: values.cost,
      }).then(
      event.preventDefault(),
      console.log(
        {
          name: values.name,
          cost: values.cost,
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
      <form onSubmit={handleSubmit}>
        {createInput('name', values.name, handleChange)}
        {createInput('cost', values.cost, handleChange)}
        <input type="submit" value="Create Product" />
      </form>
    </>
  );
};

ProductComponent.propTypes = {
  fetchPostProducts: Proptypes.func.isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  loading: state.dataStore.loading,
  business: state.dataStore.business,
});

const mapDispatchToProps = dispatch => ({
  fetchPostProducts: (endpoint, data) => dispatch(fetchPostProducts(endpoint, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
