import React, { useState } from "react";
import styled from "styled-components";
import { AWS } from "../utils/S3CredConfig";

const FormContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

const UploadImage = () => {
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState({});
  const [mime, setMime] = useState("");

  const imageUploadHandler = (e) => {
    const file = e.currentTarget.files[0];

    if (file) {
      setFileName(file.name);
      setMime(file.type);

      const reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          setImage(reader.result);
        },
        false
      );

      reader.readAsDataURL(file);
    }
  };

  const submitImage = (e) => {
    e.preventDefault();
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.REACT_APP_BUCKET
      }
    });

    const params = {
      Body: JSON.stringify({
        base64Image: image,
        mime: mime
      }),
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
