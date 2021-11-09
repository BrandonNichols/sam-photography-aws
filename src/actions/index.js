import { AWS } from "../utils/S3CredConfig";
export const AUTH_STATE = "AUTH_STATE";
export const SET_USER = "SET_USER";
export const IMAGES = "IMAGES";
export const BUCKET_SIZE = "BUCKET_SIZE";
export const INCREMENT_BUCKET_COUNT = "INCREMENT_BUCKET_COUNT";

export const setAuthState = (authorize) => (dispatch) => {
  dispatch({ type: AUTH_STATE, payload: authorize });
};

export const setUser = (user) => (dispatch) => {
  dispatch({ type: SET_USER, payload: user });
};

export const incrementBucket = () => (dispatch) => {
  dispatch({ type: INCREMENT_BUCKET_COUNT });
};

export const setImages = (images) => (dispatch) => {
  dispatch({ type: IMAGES, payload: images });
};

export const fetchBucket = () => (dispatch) => {
  const s3 = new AWS.S3({
    params: {
      Bucket: process.env.REACT_APP_BUCKET
    }
  });

  s3.listObjectsV2({}, async function (err, bucketList) {
    if (err) {
      console.log("ERROR: ", err);
    }
    try {
      dispatch({ type: BUCKET_SIZE, payload: bucketList.Contents.length });
      const responsesArray = await Promise.all(
        bucketList.Contents.map((content) => {
          return fetch(
            `https://${process.env.REACT_APP_BUCKET}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/${content.Key}`
          );
        })
      );

      const data = await Promise.all(
        responsesArray.map((response) => {
          return response.json();
        })
      );

      console.log("DATA: ", data);

      dispatch({ type: IMAGES, payload: data });
    } catch (error) {
      console.log(error);
    }
  });
};
