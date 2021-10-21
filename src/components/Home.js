import React, { useEffect, useState } from "react";
// import { fromEnv } from "@aws-sdk/credential-provider-env";
import { AWS } from "../utils/S3CredConfig";

const Home = () => {
  const [images, setImages] = useState([]);

  const s3 = new AWS.S3({
    params: {
      Bucket: process.env.REACT_APP_BUCKET
    }
  });

  const listBucketHandler = () => {
    try {
      s3.listObjectsV2({}, function (err, data) {
        if (err) {
          console.log("ERROR: ", err);
        }
        setImages(data.Contents);
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
      {images.map((image, index) => {
        return (
          <img
            key={index}
            src={`https://photo-storage-wallflouer.s3.us-east-2.amazonaws.com/${image.Key}`}
            alt=""
          />
        );
      })}
    </div>
  );
};

export default Home;
