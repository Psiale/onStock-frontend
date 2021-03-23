/* eslint-disable no-console */
import {
  SET_CURRENT_USER,
} from '../constants/auth';

const initialState = {
  has_business: false,
  credentials: '',
  login_credentials: '',
  auth_token: 'not setup',
  authenticated: false,
  data: null,
  error: '',
};

const authReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    // I need to pass this to the business reducer
    case 'BUSINESS_EXIST':
      console.log('Business Exist being trigger');
      return {
        ...state,
        has_business: true,
      };
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
