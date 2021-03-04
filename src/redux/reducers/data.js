/* eslint-disable no-console */
import { REQUEST_PENDING } from '../constants/auth';
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
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_BUSINESS:
      console.log('get business being trigger');
      return {
        ...state,
        business: action.payload,
        loading: false,
      };
    case SET_BUSINESS:
      console.log('set business being trigger');
      return {
        ...state,
        business: action.payload,
        loading: false,
      };

    case 'REQUEST_FAILED':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default: return state;
  }
};

export default dataReducer;
