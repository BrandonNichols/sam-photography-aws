import { AWS } from "../utils/AWSCredConfig";
import { decrementBucket, setImages } from "../actions";
import { connect } from "react-redux";

const DeleteImage = (props) => {
  const deleteFromS3 = () => {
    AWS.config.update({
      apiVersion: "2006-03-01"
    });

    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.REACT_APP_BUCKET,
        Key: props.name
      }
    });

    s3.deleteObject({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("S3_DELETE: ", data);
      }
    });
  };

  const deleteFromDB = () => {
    AWS.config.update({
      apiVersion: "2012-08-10"
    });

    const db = new AWS.DynamoDB.DocumentClient();

    const dbParams = {
      TableName: process.env.REACT_APP_TABLE,
      Key: {
        "photo-name": props.name
      },
      ReturnConsumedCapacity: "TOTAL"
    };

    db.delete(dbParams, function (err, data) {
      if (err) {
        console.log("DELETE_ERR: ", err);
      }
    });

    dbParams.ExpressionAttributeValues = {
      ":delVal": props.order
    };
    dbParams.ExpressionAttributeNames = {
      "#or": "order"
    };
    dbParams.FilterExpression = "#or > :delVal";

    db.scan(dbParams, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const updatedList = [...props.imageItem];
        delete dbParams.FilterExpression;
        data.Items.sort((a, b) => (a.order > b.order ? 1 : -1));
        data.Items.forEach((item, index) => {
          dbParams.Key = { "photo-name": item["photo-name"] };
          dbParams.ExpressionAttributeValues = {
            ":newOrder": item.order - 1
          };
          dbParams.UpdateExpression = "SET #or = :newOrder";
          db.update(dbParams, function (err, data) {
            if (err) {
              console.log(err);
            }
          });
          updatedList[item.order - 1].order = item.order - 1;
        });
        props.decrementBucket();
        updatedList.splice(props.order - 1, 1);
        props.setImages(updatedList);
      }
    });
  };

  const deleteImage = () => {
    deleteFromS3();
    deleteFromDB();
  };
  return <button onClick={deleteImage}>x</button>;
};

const mapStateToProps = (state) => {
  return {
    imageItem: state.images,
    bucketSize: state.bucketSize
  };
};

export default connect(mapStateToProps, { decrementBucket, setImages })(
  DeleteImage
);
