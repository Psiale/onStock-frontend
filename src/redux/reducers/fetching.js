import SET_FETCHING from '../constants/fetching';

const initialState = {
  isFetching: false,
};

const fetchReducer = (state = initialState, action) => {
  if (action.type === SET_FETCHING) {
    return {
      ...state,
      isFetching: action.isFetching,
    };
  }
  return state;
};

export default fetchReducer;
