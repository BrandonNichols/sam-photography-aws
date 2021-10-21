import React, { useState } from "react";
import styled from "styled-components";
import { AWS } from "../utils/S3CredConfig";

const FormContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

const UploadImage = () => {
  const [fileName, setFileName] = useState("");

  const imageUploadHandler = (e) => {
    const file = e.currentTarget.files[0];
    const name = file.name;

    setFileName(name);
  };

  const submitImage = (e) => {
    e.preventDefault();
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.REACT_APP_BUCKET
      }
    });

    const binaryFile = new Buffer.from(fileName, "binary");

    const params = {
      Body: binaryFile,
      Key: fileName
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("DATA_UPLOAD_IMAGE: ", data);
      }
    });
  };

  return (
    <div>
      <h1>UPLOAD IMAGE</h1>
      <FormContainer>
        <form onSubmit={submitImage}>
          <input type="file" onChange={imageUploadHandler} />
          <button type="submit">Submit Image</button>
        </form>
      </FormContainer>
    </div>
  );
};

export default UploadImage;
