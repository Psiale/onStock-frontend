import { ADD_MATERIAL, SHOW_MATERIALS } from '../constants/materials';

const initialState = [];

const materialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MATERIAL:
      return [...state, action.material];
    case SHOW_MATERIALS: {
      return action.materials;
    }
    default: return state;
  }
};

export default materialsReducer;
