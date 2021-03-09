/* eslint-disable no-unused-expressions */
import React, { useLayoutEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGetProducts } from '../redux/actions/data';
import ProductComponent from './setters/ProductComponent';
import ModalComponent from './Modal';

const ProductsListComponent = ({
  fetchGetProducts,
  products,
  business,
}) => {
  useLayoutEffect(() => {
    fetchGetProducts(`business/${business.id}/products`);
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (products !== null) ? (
    <>
      {products.map(items => <p key={items.id}>{items.name}</p>)}
      <ModalComponent show={show} handleClose={handleClose} handleShow={handleShow} title="Add a new Product" child={<ProductComponent />} />
    </>
  ) : <ModalComponent show={show} handleClose={handleClose} handleShow={handleShow} title="Add a new Product" child={<ProductComponent />} />;
};

ProductsListComponent.propTypes = {
  fetchGetProducts: Proptypes.func.isRequired,
  products: Proptypes.arrayOf(Proptypes.shape({
    name: Proptypes.string,
    cost: Proptypes.number,
  })).isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  products: state.dataStore.products,
  business: state.dataStore.business,
});

const mapDispatchToProps = dispatch => ({
  fetchGetProducts: endpoint => dispatch(fetchGetProducts(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListComponent);
