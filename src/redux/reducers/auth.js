/* eslint-disable no-console */
import {
  ACCESS_REQUEST,
  LOGIN_REQUEST,
  REQUEST_FAILED,
  REQUEST_PENDING,
  REQUEST_SUCCEED,
} from '../constants/auth';

const initialState = {
  isAuth: false,
  loading: false,
  credentials: '',
  login_credentials: '',
  authToken: '',
  error: '',
};

const authReducer = (state = initialState, action) => {
  console.log(`Im the auth reducer and this is the action content: ${action.payload}`);
  switch (action.type) {
    case REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ACCESS_REQUEST:
      console.log('access request happening');
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
        isAuth: false,
        loading: false,
        authToken: '',
        error: action.payload,
      };
    case REQUEST_SUCCEED:
      return {
        ...state,
        isAuth: true,
        loading: false,
      };
    default: return state;
  }
};

export default authReducer;
