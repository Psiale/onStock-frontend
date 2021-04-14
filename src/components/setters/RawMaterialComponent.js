/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postRawMaterials, putRawMaterial, deleteRawMaterials } from '../../redux/actions/materials';
import { createInput } from '../../helpers';
import {
  setNavBarModal, setDecreaseModal, setIncreaseModal, setDeleteModal,
} from '../../redux/actions/modal';

const RawMaterialComponent = ({
  postRawMaterials,
  deleteRawMaterials,
  business, putRawMaterial, update,
  item,
  decrease,
  remove,
  setNavBarModal,
  setDecreaseModal, setIncreaseModal,
  setDeleteModal,
}) => {
  const history = useHistory();
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
        }
        putRawMaterial(`business/${business.id}/raw_materials/${item.id}`,
          {
            remaining_amount: (item.remaining_amount - values.amount),
          }).then(
          event.preventDefault(),
          setDecreaseModal(false),
          setValues({ pressed: true }),
        );
      } else {
        const result = item.remaining_amount + parseFloat(values.amount);
        if (values.amount > item.total_amount
          || parseFloat(values.amount) + item.remaining_amount > item.total_amount) {
          putRawMaterial(`business/${business.id}/raw_materials/${item.id}`,
            {
              total_amount: (parseFloat(values.amount) + item.remaining_amount),
              remaining_amount: (parseFloat(values.amount) + item.remaining_amount),
            }).then(
            event.preventDefault(),
            setIncreaseModal(false),
            setValues({ pressed: true }),
          );
          return;
        }
        putRawMaterial(`business/${business.id}/raw_materials/${item.id}`,
          {
            remaining_amount: (result),
          }).then(
          event.preventDefault(),
          setIncreaseModal(false),
          setValues({ pressed: true }),
        );
      }
      return;
    }
    if (remove) {
      deleteRawMaterials(`business/${business.id}/raw_materials/${item.id}`).then(
        event.preventDefault(),
        setValues({ pressed: true }),
        setDeleteModal(false),
      );
      return;
    }
    postRawMaterials(`business/${business.id}/raw_materials`,
      {
        name: values.name,
        total_amount: values.totalAmount,
        remaining_amount: values.totalAmount,
      }).then(
      event.preventDefault(),
      setValues({ pressed: true }),
      setNavBarModal(false),
      history.push('/business/raw_materials'),
    );
    setValues({ pressed: true });
  };
  const handleChange = evt => {
    const { value } = evt.target;
    setValues({
      ...values,
      [evt.target.name]: value,
    });
  };

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

  if (remove) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <p>
            Are you sure you want to delete <strong> {item.name} </strong>
          </p>
          <input type="submit" value="Delete" disabled={values.pressed} />
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
  postRawMaterials: PropTypes.func.isRequired,
  putRawMaterial: PropTypes.func.isRequired,
  deleteRawMaterials: PropTypes.func.isRequired,
  setNavBarModal: PropTypes.func.isRequired,
  business: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    owner_id: PropTypes.number,
  }).isRequired,
  update: PropTypes.bool,
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    total_amount: PropTypes.number,
    remaining_amount: PropTypes.number,
  }),
  decrease: PropTypes.bool,
  remove: PropTypes.bool,
  setDecreaseModal: PropTypes.func.isRequired,
  setIncreaseModal: PropTypes.func.isRequired,
  setDeleteModal: PropTypes.func.isRequired,
};

RawMaterialComponent.defaultProps = {
  update: false,
  item: '',
  decrease: false,
  remove: false,
};

const mapStateToProps = state => ({
  business: state.businessStore.business,
});

const mapDispatchToProps = dispatch => ({
  postRawMaterials: (endpoint, data) => dispatch(postRawMaterials(endpoint, data)),
  putRawMaterial: (endpoint, data) => dispatch(putRawMaterial(endpoint, data)),
  deleteRawMaterials: endpoint => dispatch(deleteRawMaterials(endpoint)),
  setNavBarModal: isShowing => dispatch(setNavBarModal(isShowing)),
  setDecreaseModal: isShowing => dispatch(setDecreaseModal(isShowing)),
  setIncreaseModal: isShowing => dispatch(setIncreaseModal(isShowing)),
  setDeleteModal: isShowing => dispatch(setDeleteModal(isShowing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RawMaterialComponent);
