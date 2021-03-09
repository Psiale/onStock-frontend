/* eslint-disable no-console */
import React, { useLayoutEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { createInput } from '../../helpers';
import Ingredient from '../../classes/Ingredient';
import { fetchGetProductRawMaterials } from '../../redux/actions/data';

const IngredientsComponent = ({ selectedMaterials }) => {
  useLayoutEffect(() => {
    fetchGetProductRawMaterials() // update This function to have the endpoint that retrieves the product raw materials 
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
};

const mapStateToProps = state => ({
  authToken: state.authStore.auth_token,
  loading: state.dataStore.loading,
});

export default connect(mapStateToProps, null)(IngredientsComponent);
