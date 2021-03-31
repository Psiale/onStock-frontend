const initialState = {
  isShowing: false,
};

const modalReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'CLOSE_MODAL':
      return {
        ...state,
        isShowing: action.isShowing,
      };
    default: return state;
  }
};

export default modalReducer;
