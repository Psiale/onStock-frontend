import { GET_BUSINESS, SET_BUSINESS } from '../constants/data';

const initialState = {
  business: {},
  products: [],
  rawMaterials: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action) {
    case GET_BUSINESS:
      return {
        ...state,
        business: action.payload,
      };
    case SET_BUSINESS:
      return {
        ...state,
        business: action.payload,
      };
    default: return state;
  }
};

export default dataReducer;
