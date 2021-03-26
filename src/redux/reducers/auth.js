/* eslint-disable no-console */
import { SET_CURRENT_USER, INITIAL_STATE } from '../constants/auth';

const initialState = {
  authenticated: false,
  data: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        authenticated: true,
        data: action.currentUser,
      };
    case INITIAL_STATE:
      return initialState;

    default: return state;
  }
};

export default authReducer;
