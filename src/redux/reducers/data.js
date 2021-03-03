import { GET_BUSINESS, SET_BUSINESS } from '../constants/data';

const initialState = {
  business: {
    id: null,
    name: "the business's name",
    avatar: 'default avatar',
    owner_id: null,
  },
  products: [],
  rawMaterials: [],
  error: '',
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

    case 'REQUEST_FAILED':
      return {
        ...state,
        error: action.payload,
      };

    default: return state;
  }
};

export default dataReducer;
