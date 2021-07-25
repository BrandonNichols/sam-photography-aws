export const AUTH_STATE = "AUTH_STATE";
export const SET_USER = "SET_USER";

export const setAuthState = (authorize) => (dispatch) => {
  dispatch({ type: AUTH_STATE, payload: authorize });
};

export const setUser = (user) => (dispatch) => {
  dispatch({ type: SET_USER, payload: user });
};
