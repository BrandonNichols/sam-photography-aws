import { SIGN_IN, SIGN_OUT } from "../actions";

const initialState = {
  loginStatus: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        loginStatus: true
      };
    case SIGN_OUT:
      return {
        ...state,
        loginStatus: false
      };
    default:
      return state;
  }
};

export default reducer;
