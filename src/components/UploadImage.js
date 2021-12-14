import React, { useState } from "react";
import styled from "styled-components";
import { AWS } from "../utils/AWSCredConfig";
import { incrementBucket } from "../actions";
import { connect } from "react-redux";

const FormContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
  height: max-content;
`;

const PrevImage = styled.img`
  max-height: 500px;
  max-width: 500px;
`;

const UploadImage = (props) => {
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState({});
  const [mime, setMime] = useState("");
  const [preview, setPreview] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);

  const imageUploadHandler = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function (e) {
        setPreview(reader.result);
      });
      reader.readAsDataURL(file);
      setFileName(file.name);
      setMime(file.type);
      setImage(file);
    }
  };

  const submitImage = (e) => {
    e.preventDefault();

    setSubmitStatus(true);

    AWS.config.update({
      apiVersion: "2006-03-01"
    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.REACT_APP_BUCKET,
        Body: image,
        Key: fileName,
        ContentType: mime
      }
    });

    s3.putObject(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        props.incrementBucket();
      }
    });

    AWS.config.update({
      apiVersion: "2012-08-10"
    });

    const dbParams = {
      TableName: process.env.REACT_APP_TABLE,
      Item: {
        "photo-name": fileName,
        order: props.bucketSize + 1,
        link: `https://${process.env.REACT_APP_BUCKET}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/${fileName}`
      },
      ReturnConsumedCapacity: "TOTAL"
    };

    const docClient = new AWS.DynamoDB.DocumentClient();

    docClient.put(dbParams, function (err, data) {
      if (err) {
        console.log(err);
        setUploadStatus(false);
      } else {
        setUploadStatus(true);
      }
    });
  };

  return (
    <FormContainer>
      <form onSubmit={submitImage}>
        <input type="file" onChange={imageUploadHandler} />
        <button type="submit">Submit Image</button>
      </form>
      {submitStatus ? (
        uploadStatus ? (
          <p>Successful upload</p>
        ) : (
          <p>Upload failed</p>
        )
      ) : null}
      <PrevImage src={preview} alt="" />
    </FormContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    bucketSize: state.bucketSize
  };
};

export default connect(mapStateToProps, { incrementBucket })(UploadImage);
