/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { postBusiness } from '../../redux/actions/business';
import { createInput } from '../../helpers';

const BusinessComponent = ({ postBusiness }) => {
  const [values, setValues] = useState({
    name: '',
  });
  const history = useHistory();

  const handleSubmit = () => {
    postBusiness('business',
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
  postBusiness: Proptypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  postBusiness: (endpoint, data) => dispatch(postBusiness(endpoint, data)),
});

export default connect(null, mapDispatchToProps)(BusinessComponent);
