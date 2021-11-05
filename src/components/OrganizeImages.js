import { useState } from "react";
import { connect } from "react-redux";
import { setImages } from "../actions";
import styled from "styled-components";

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
    if (Number(value.target) <= props.bucketSize) {
      const imageContainers = [...props.imageContainers];
      imageContainers[value.current - 1].order = value.target;
      imageContainers[value.target - 1].order = value.current;
      props.setImages(imageContainers);
    }
  };

  return (
    <OrganizerContainer>
      <h1>Organize Images</h1>
      {props.imageContainers.map((imgObj, index) => {
        return (
          <div key={index}>
            <Image src={imgObj.base64Image} alt="" />
            <input
              type="number"
              value={orderValue[imgObj.name] || ""}
              name={imgObj.name}
              placeholder={imgObj.order}
              onChange={inputHandler}
              min="1"
              max={props.bucketSize}
            />
            {console.log("ORDER VALUE: ", orderValue)}
            <button
              type="button"
              value={`{"target": ${
                orderValue[imgObj.name] || imgObj.order
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
