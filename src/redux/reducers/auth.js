import {
  ACCESS_REQUEST,
  REQUEST_FAILED,
  REQUEST_PENDING,
  REQUEST_SUCCEED,
} from '../constants/auth';

const initialState = {
  is_auth: false,
  loading: false,
  credentials: '',
  auth_token: '',
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action) {
    case REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ACCESS_REQUEST:
      return {
        ...state,
        is_auth: false,
        loading: true,
        credentials: action.payload,
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
        auth_token: action.payload,
      }
    default: return state;
  }
};

export default authReducer;
