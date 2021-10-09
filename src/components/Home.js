import React, { useEffect } from "react";
import { S3 } from "@aws-sdk/client-s3";
// import { fromEnv } from "@aws-sdk/credential-provider-env";
import AWS from "aws-sdk";

const Home = () => {
  console.log("ACCESS_KEY_ID: ", process.env.REACT_APP_AWS_ACCESS_KEY_ID);
  const creds = new AWS.Credentials(
    process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  );

  AWS.config.update({
    apiVersion: "2006-03-01",
    credentials: creds
  });

  const s3 = new AWS.S3({
    params: {
      Bucket: process.env.REACT_APP_BUCKET
    }
  });

  const listBucketHandler = async () => {
    try {
      const res = await s3.listObjectsV2({}, function (err, data) {
        if (err) {
          console.log("ERROR: ", err);
        }
        console.log("Data: ", data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listBucketHandler();
  }, []);

  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
};

export default Home;
