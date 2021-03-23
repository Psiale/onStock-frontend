/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import axios from 'axios';
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import { postRawMaterials, putRawMaterial } from '../../redux/actions/materials';
import { createInput } from '../../helpers';

const RawMaterialComponent = ({
  postRawMaterials,
  business, putRawMaterial, update,
  item,
  decrease,
}) => {
  const [values, setValues] = useState({
    name: '',
    totalAmount: 0,
    amount: 0,
    pressed: false,
  });

  const handleSubmit = event => {
    if (update) {
      if (decrease) {
        if (item.remaining_amount - values.amount < 0) {
          event.preventDefault();
          setValues({ pressed: true });
          return;
          // hacer algo mejor que esto
        }
        console.log(`id number: ${item.id}`);
        // actualizo
        // talvez debería regresar todos desde la api para no tener que reactualizar
        putRawMaterial(`business/${business.id}/raw_materials/${item.id}`,
          {
            remaining_amount: (item.remaining_amount - values.amount),
          }).then(
          // luego jalo todos los materiales para que se actualice el elemento,
          event.preventDefault(),
          setValues({ pressed: true }),
          console.log(item.remaining_amount - values.amount),
        );
      } else {
        console.log(`remaining amount type: ${typeof parseFloat(values.amount)}`);
        // actualizo
        // talvez debería regresar todos desde la api para no tener que reactualizar
        const result = item.remaining_amount + parseFloat(values.amount);
        if (values.amount > item.total_amount
          || parseFloat(values.amount) + item.remaining_amount > item.total_amount) {
          putRawMaterial(`business/${business.id}/raw_materials/${item.id}`,
            {
              total_amount: (parseFloat(values.amount)),
              remaining_amount: (parseFloat(values.amount)),
            }).then(
          // luego jalo todos los materiales para que se actualice el elemento,
            event.preventDefault(),
            setValues({ pressed: true }),
            console.log(result),
          );
          return;
        }
        putRawMaterial(`business/${business.id}/raw_materials/${item.id}`,
          {
            remaining_amount: (result),
          }).then(
          // luego jalo todos los materiales para que se actualice el elemento,
          event.preventDefault(),
          setValues({ pressed: true }),
        );
      }
      return;
    }
    console.log(axios.defaults.headers.common);
    postRawMaterials(`business/${business.id}/raw_materials`,
      {
        name: values.name,
        total_amount: values.totalAmount,
        remaining_amount: values.totalAmount,
      }).then(
      event.preventDefault(),
      setValues({ pressed: true }),
      console.log(
        {
          name: values.name,
          totalAmount: values.totalAmount,
          remainingAmount: values.totalAmount,
        },
      ),
    );
    setValues({ pressed: true });
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
          {createInput('amount', values.amount, handleChange, 'number')}
          <input type="submit" value="Update" disabled={values.pressed} />
        </form>
      </>
    );
  }
  return (
    <>
      <span> Add a new Raw Material </span>
      <form onSubmit={handleSubmit}>
        {createInput('name', values.name, handleChange)}
        {createInput('totalAmount', values.totalAmount, handleChange, 'number')}
        <input type="submit" value="Create Raw Material" disabled={values.pressed} />
      </form>
    </>
  );
};

RawMaterialComponent.propTypes = {
  postRawMaterials: Proptypes.func.isRequired,
  putRawMaterial: Proptypes.func.isRequired,
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
  decrease: Proptypes.bool,
};

RawMaterialComponent.defaultProps = {
  update: false,
  item: '',
  decrease: false,
};

const mapStateToProps = state => ({
  business: state.businessStore.business,
});

const mapDispatchToProps = dispatch => ({
  postRawMaterials: (endpoint, data) => dispatch(postRawMaterials(endpoint, data)),
  putRawMaterial: (endpoint, data) => dispatch(putRawMaterial(endpoint, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialComponent);
