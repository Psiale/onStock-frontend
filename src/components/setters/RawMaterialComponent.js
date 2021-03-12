/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import axios from 'axios';
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import {
  fetchPostRawMaterials, fetchPutRawMaterial, fetchGetRawMaterials,
  fetchRawMaterialRequestPost,
} from '../../redux/actions/data';
import { createInput } from '../../helpers';

const RawMaterialComponent = ({
  fetchPostRawMaterials,
  business, fetchPutRawMaterial, update,
  item,
  fetchRawMaterialRequestPost,
  fetchGetRawMaterials,
}) => {
  const [values, setValues] = useState({
    name: '',
    totalAmount: '',
    amount: '',
  });
  // const history = useHistory();

  const handleSubmit = event => {
    if (update) {
      fetchRawMaterialRequestPost(item);
      fetchPutRawMaterial(`business/${business.id}/raw_materials/${item.id}`,
        {
          remaining_amount: (item.remaining_amount - values.amount),
        }).then(
        fetchGetRawMaterials(`business/${business.id}/raw_materials`),
        event.preventDefault(),
        console.log(item.remaining_amount - values.amount),
      );
      return;
    }
    console.log(axios.defaults.headers.common);
    fetchPostRawMaterials(`business/${business.id}/raw_materials`,
      {
        name: values.name,
        total_amount: values.totalAmount,
        remaining_amount: values.totalAmount,
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
  // add the multiselect with unit measures p/e: ml, g, mg, kg, etc

  if (update) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          {createInput('amount', values.amount, handleChange)}
          <input type="submit" value="Update" />
        </form>
      </>
    );
  }
  return (
    <>
      <span> Add a new Raw Material </span>
      <form onSubmit={handleSubmit}>
        {createInput('name', values.name, handleChange)}
        {createInput('totalAmount', values.totalAmount, handleChange)}
        <input type="submit" value="Create Raw Material" />
      </form>
    </>
  );
};

RawMaterialComponent.propTypes = {
  fetchRawMaterialRequestPost: Proptypes.func.isRequired,
  fetchPostRawMaterials: Proptypes.func.isRequired,
  fetchPutRawMaterial: Proptypes.func.isRequired,
  fetchGetRawMaterials: Proptypes.func.isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
  update: Proptypes.bool,
  item: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    total_amount: Proptypes.number,
    remaining_amount: Proptypes.number,
  }),
};

RawMaterialComponent.defaultProps = {
  update: false,
  item: '',
};

const mapStateToProps = state => ({
  loading: state.dataStore.loading,
  business: state.dataStore.business,
});

const mapDispatchToProps = dispatch => ({
  fetchPostRawMaterials: (endpoint, data) => dispatch(fetchPostRawMaterials(endpoint, data)),
  fetchPutRawMaterial: (endpoint, data) => dispatch(fetchPutRawMaterial(endpoint, data)),
  fetchGetRawMaterials: endpoint => dispatch(fetchGetRawMaterials(endpoint)),
  fetchRawMaterialRequestPost: data => dispatch(fetchRawMaterialRequestPost(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialComponent);
