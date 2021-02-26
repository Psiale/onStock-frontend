import {
  ACCESS_REQUEST,
  REQUEST_FAILED,
  REQUEST_PENDING,
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
        is_auth: true,
        loading: false,
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

    default: return state;
  }
};

export default authReducer;
