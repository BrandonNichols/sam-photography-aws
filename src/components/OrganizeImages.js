import { useState } from "react";
import { connect } from "react-redux";
import { setImages } from "../actions";
import styled from "styled-components";
import { AWS } from "../utils/AWSCredConfig";

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

const OrganizerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
    <OrganizerContainer>
      <h1>Organize Images</h1>
      {props.imageContainers.map((imgObj, index) => {
        return (
          <div key={index}>
            <Image src={imgObj.link} alt="" />
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
          </div>
        );
      })}
    </OrganizerContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    imageContainers: state.images,
    bucketSize: state.bucketSize
  };
};

export default connect(mapStateToProps, { setImages })(OrganizeImages);
