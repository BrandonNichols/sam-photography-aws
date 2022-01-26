import { useState } from "react";
import { connect } from "react-redux";
import { setImages } from "../actions";
import styled from "styled-components";
import { AWS } from "../utils/AWSCredConfig";
import DeleteImage from "./DeleteImage";
import UploadImage from "./UploadImage";

const Image = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

const ImageManagerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const OrganizeImageContainer = styled.div`
  margin-bottom: 300px;
`;

const ImageThumbnailContainer = styled.div`
  display: block;
  position: relative;
`;

const DeleteButton = styled(DeleteImage)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  padding: 0;
  border: none;
  height: min-content;
`;

const ChangeOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrganizeThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const OrganizeImages = (props) => {
  const [orderValue, setOrderValue] = useState({});

  const inputHandler = (e) => {
    setOrderValue((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const changeImageOrder = (e) => {
    e.preventDefault();
    const value = JSON.parse(e.currentTarget.value);

    AWS.config.update({
      apiVersion: "2012-08-10"
    });

    const docClient = new AWS.DynamoDB.DocumentClient();

    if (Number(value.target) <= props.bucketSize) {
      const imageContainers = [...props.imageContainers];
      imageContainers[value.current - 1].order = value.target;
      const dbParams = {
        TableName: process.env.REACT_APP_TABLE,
        Key: {
          "photo-name": imageContainers[value.current - 1]["photo-name"]
        },
        UpdateExpression: "SET #or = :v",
        ExpressionAttributeNames: {
          "#or": "order"
        },
        ExpressionAttributeValues: {
          ":v": value.target
        },
        ReturnConsumedCapacity: "TOTAL"
      };

      docClient.update(dbParams, function (err, data) {
        if (err) {
          console.log(err);
        }
      });

      imageContainers[value.target - 1].order = value.current;

      dbParams.Key["photo-name"] =
        imageContainers[value.target - 1]["photo-name"];
      dbParams.ExpressionAttributeValues[":v"] = value.current;

      docClient.update(dbParams, function (err, data) {
        if (err) {
          console.log(err);
        }
      });

      props.setImages(imageContainers);
    }
  };

  return (
    <ImageManagerContainer>
      <h1>Manage Images</h1>
      <UploadImage />
      <h2>Organize Images</h2>
      <OrganizeImageContainer>
        {props.imageContainers.map((imgObj, index) => {
          return (
            <OrganizeThumbnailContainer key={index}>
              <ImageThumbnailContainer>
                <DeleteButton
                  name={imgObj["photo-name"]}
                  order={imgObj.order}
                />
                <Image src={imgObj.link} alt="" />
              </ImageThumbnailContainer>
              <ChangeOrderContainer>
                <input
                  type="number"
                  value={orderValue[imgObj["photo-name"]] || ""}
                  name={imgObj["photo-name"]}
                  placeholder={imgObj.order}
                  onChange={inputHandler}
                  min="1"
                  max={props.bucketSize}
                />
                <button
                  type="button"
                  value={`{"target": ${
                    orderValue[imgObj["photo-name"]] || imgObj.order
                  },"current": ${imgObj.order}}`}
                  onClick={changeImageOrder}
                >
                  Change Order
                </button>
              </ChangeOrderContainer>
            </OrganizeThumbnailContainer>
          );
        })}
      </OrganizeImageContainer>
    </ImageManagerContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    imageContainers: state.images,
    bucketSize: state.bucketSize
  };
};

export default connect(mapStateToProps, { setImages })(OrganizeImages);
