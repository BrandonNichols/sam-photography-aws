import {
  AUTH_STATE,
  SET_USER,
  IMAGES,
  BUCKET_SIZE,
  INCREMENT_BUCKET_COUNT
} from "../actions";

const initialState = {
  currentUser: {},
  authState: "",
  images: [],
  bucketSize: 0
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
    case IMAGES:
      return {
        ...state,
        images: action.payload
      };
    case BUCKET_SIZE:
      return {
        ...state,
        bucketSize: action.payload
      };
    case INCREMENT_BUCKET_COUNT:
      return {
        ...state,
        bucketSize: state.bucketSize + 1
      };
    default:
      return state;
  }
};

export default reducer;
