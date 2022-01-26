import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { AWS } from "../utils/AWSCredConfig";
import { incrementBucket } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const FormContainer = styled.div`
  margin: 40px 0;
  width: fit-content;
  height: max-content;
  border: 5px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PrevImage = styled.img`
  max-height: 500px;
  max-width: 500px;
  margin-top: 20px;
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
`;

const SpinAnimation = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: ${(props) => (props.submitStatus ? "block" : "none")};
  border: 10px solid grey;
  border-top: 10px solid blue;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  animation: ${SpinAnimation} 2s linear infinite;
`;

const UpdateStatus = styled.div`
  display: ${(props) => (props.displayUpload ? "block" : "none")};
  margin: 10px 50%;
`;

const UploadImage = (props) => {
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState({});
  const [mime, setMime] = useState("");
  const [preview, setPreview] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [displayUpload, setDisplayUpload] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);

  const imageUploadHandler = (e) => {
    const file = e.currentTarget.files[0];
    setDisplayUpload(false);
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

    setTimeout(() => {
      setSubmitStatus(false);
      setDisplayUpload(true);
    }, 3000);

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
      <Title>Upload Image</Title>
      <div>
        <form onSubmit={submitImage}>
          <input type="file" onChange={imageUploadHandler} />
          <button type="submit">Submit Image</button>
        </form>
        <Loader submitStatus={submitStatus} />
        <UpdateStatus displayUpload={displayUpload}>
          {uploadStatus ? (
            <FontAwesomeIcon
              icon={faCheck}
              size={"lg"}
              style={{ color: "green" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faTimesCircle}
              size={"lg"}
              style={{ color: "red" }}
            />
          )}
        </UpdateStatus>
      </div>
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
