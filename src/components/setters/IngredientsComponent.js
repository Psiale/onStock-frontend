/* eslint-disable no-console */
import React, { useLayoutEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { createInput } from '../../helpers';
import Ingredient from '../../classes/Ingredient';
import { fetchGetProductRawMaterials } from '../../redux/actions/data';

const IngredientsComponent = ({ selectedMaterials, business, product }) => {
  useLayoutEffect(() => {
    fetchGetProductRawMaterials(`business/${business.id}/products/${product.id}/raw_materials`);
  }, []);
  // eslint-disable-next-line react/prop-types
  const ingredients = selectedMaterials.map(
    ingredient => Ingredient(ingredient.id, ingredient.name, 0),
  );

  const createState = name => ({
    [name]: name,
  });

  const ingredientsState = ingredients.forEach(ingredient => {
    createState(ingredient.name);
  });

  const [values, setValues] = useState({
    ingredientsState,
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(values);
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
      <span> No Business Yet :c </span>
      <form onSubmit={handleSubmit}>
        {ingredients.map(
          ingredient => createInput(ingredient.name, values.ingredient.name, handleChange),
        )}
        <input type="submit" value="Create Business" />
      </form>
    </>
  );
};

IngredientsComponent.propTypes = {
  selectedMaterials: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    total_amount: Proptypes.number.isRequired,
    remaining_amount: Proptypes.number.isRequired,
  }).isRequired,
  business: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
  product: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    owner_id: Proptypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  business: state.dataStore.business,
  loading: state.dataStore.selectedMaterials,
});

export default connect(mapStateToProps, null)(IngredientsComponent);
