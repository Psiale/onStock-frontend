/* eslint-disable no-console */
import {
  SET_CURRENT_USER,
} from '../constants/auth';

const initialState = {
  authenticated: false,
  data: null,
};

const authReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'DEFAULT':
      return {
        ...state,
        auhthenticated: false,
        auth_token: '',
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        authenticated: true,
        data: action.currentUser,
      };
    default: return state;
  }
};

export default authReducer;
