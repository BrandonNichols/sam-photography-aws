import { AUTH_STATE, SET_USER } from "../actions";

const initialState = {
  currentUser: {},
  authState: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_STATE:
      return {
        ...state,
        authState: action.payload
      };
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
