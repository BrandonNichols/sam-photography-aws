import { AWS } from "../utils/AWSCredConfig";
export const AUTH_STATE = "AUTH_STATE";
export const SET_USER = "SET_USER";
export const IMAGES = "IMAGES";
export const BUCKET_SIZE = "BUCKET_SIZE";
export const INCREMENT_BUCKET_COUNT = "INCREMENT_BUCKET_COUNT";
export const DECREMENT_BUCKET_COUNT = "DECREMENT_BUCKET_COUNT";

export const setAuthState = (authorize) => (dispatch) => {
  dispatch({ type: AUTH_STATE, payload: authorize });
};

export const setUser = (user) => (dispatch) => {
  dispatch({ type: SET_USER, payload: user });
};

export const incrementBucket = () => (dispatch) => {
  dispatch({ type: INCREMENT_BUCKET_COUNT });
};

export const decrementBucket = () => (dispatch) => {
  dispatch({ type: DECREMENT_BUCKET_COUNT });
};

export const setImages = (images) => (dispatch) => {
  dispatch({ type: IMAGES, payload: images });
};

export const fetchBucket = () => (dispatch) => {
  AWS.config.update({
    apiVersion: "2012-08-10"
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  const dbParams = {
    TableName: process.env.REACT_APP_TABLE,
    ReturnConsumedCapacity: "TOTAL"
  };

  docClient.scan(dbParams, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      dispatch({ type: IMAGES, payload: data.Items });
      dispatch({ type: BUCKET_SIZE, payload: data.Count });
    }
  });
};
