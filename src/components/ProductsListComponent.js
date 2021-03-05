/* eslint-disable no-unused-expressions */
import React, { useLayoutEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGetProducts } from '../redux/actions/data';
import ProductComponent from './setters/ProductComponent';

const ProductsListComponent = ({
  fetchGetProducts,
  products,
  business,
}) => {
  useLayoutEffect(() => {
    fetchGetProducts(`business/${business.id}/products`);
  }, []);

  return (products !== null) ? (
    <>
      {products.map(items => <p key={items.id}>{items.name}</p>)}
      <ProductComponent />
    </>
  ) : <ProductComponent />;
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
