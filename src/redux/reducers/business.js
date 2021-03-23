import { ADD_BUSINESS, SHOW_BUSINESS } from '../constants/business';

const initialState = {
  business: null,
};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUSINESS:
      return {
        ...state,
        business: action.business,
      };
    case SHOW_BUSINESS:
      return {
        ...state,
        busines: action.business,
      };
    default: return state;
  }
};

export default businessReducer;
