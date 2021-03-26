import { ADD_BUSINESS, HAS_BUSINESS, SHOW_BUSINESS } from '../constants/business';

const initialState = {
  business: null,
  has_business: false,
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
        business: action.business,
      };
    case HAS_BUSINESS:
      return {
        ...state,
        has_business: true,
      };
    case 'INITIAL_STATE':
      return initialState;
    default: return state;
  }
};

export default businessReducer;
