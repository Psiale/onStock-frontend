import { ADD_MATERIAL, SHOW_MATERIALS } from '../constants/materials';

const initialState = {
  raw_materials: [],
};

const materialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MATERIAL:
      return {
        ...state,
        raw_materials: action.materials,
      };
    case SHOW_MATERIALS: {
      return {
        ...state,
        raw_materials: action.materials,
      };
    }
    default: return state;
  }
};

export default materialsReducer;
