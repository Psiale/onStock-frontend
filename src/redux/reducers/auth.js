/* eslint-disable no-console */
import {
  ACCESS_REQUEST,
  LOGIN_REQUEST,
  REQUEST_FAILED,
  REQUEST_PENDING,
  REQUEST_SUCCEED,
  SET_CURRENT_USER,
} from '../constants/auth';

const initialState = {
  is_auth: false,
  loading: false,
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
    case REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ACCESS_REQUEST:
      return {
        ...state,
        loading: true,
        credentials: action.credentials,
        auth_token: action.payload,
        error: '',
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        login_credentials: action.login_credentials,
        auth_token: action.payload,
        error: '',
      };
    case REQUEST_FAILED:
      return {
        ...state,
        is_auth: false,
        loading: false,
        auth_token: '',
        error: action.payload,
      };

    case 'BUSINESS_EXIST':
      console.log('Business Exist being trigger');
      return {
        ...state,
        has_business: true,
      };
    case REQUEST_SUCCEED:
      return {
        ...state,
        is_auth: true,
        loading: false,
      };
    case 'DEFAULT':
      return {
        ...state,
        is_auth: false,
        loading: false,
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
