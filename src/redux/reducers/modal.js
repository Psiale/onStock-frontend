const initialState = {
  navBarIsShowing: false,
  increaseIsShowing: false,
  decreaseIsShowing: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NAVBAR_MODAL':
      return {
        ...state,
        navBarIsShowing: action.isShowing,
      };
    case 'INCREASE_MODAL':
      return {
        ...state,
        increaseIsShowing: action.isShowing,
      };
    case 'DECREASE_MODAL':
      return {
        ...state,
        decreaseIsShowing: action.isShowing,
      };
    default: return state;
  }
};

export default modalReducer;
