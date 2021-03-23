import SET_ERROR from '../constants/error';

const initialState = {
  error: false,
};

const errorReducer = (state = initialState, action) => {
  if (action.type === SET_ERROR) {
    return {
      ...state,
      error: true,
    };
  }
  return state;
};
export default errorReducer;
