export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const signIn = () => (dispatch) => {
  dispatch({ type: SIGN_IN });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: SIGN_OUT });
};
