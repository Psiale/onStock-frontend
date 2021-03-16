/* eslint-disable no-console */
import {
  ACCESS_REQUEST,
  LOGIN_REQUEST,
  REQUEST_FAILED,
  REQUEST_PENDING,
  REQUEST_SUCCEED,
} from '../constants/auth';

const initialState = {
  is_auth: false,
  loading: false,
  credentials: '',
  login_credentials: '',
  auth_token: 'not setup',
  error: '',
};

const authReducer = (state = initialState, action) => {
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
    default: return state;
  }
};

export default authReducer;
