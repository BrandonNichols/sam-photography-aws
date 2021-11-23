import { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchBucket } from "../actions";

const CenteredDiv = styled.div`
  width: min-content;
  min-width: 100px;
  min-height: 100px;
  margin: 0 auto;
`;

const Image = styled.img`
  max-width: 500px;
  max-height: 500px;
`;

const Home = (props) => {
  useEffect(() => {
    props.fetchBucket();
  }, []);

  return (
    <div>
      <h1>HOME</h1>
      {props.imageContainers.map((imgObj, index) => {
        return (
          <CenteredDiv key={index}>
            <Image src={imgObj.link} alt="" />
          </CenteredDiv>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    imageContainers: state.images
  };
};

export default connect(mapStateToProps, { fetchBucket })(Home);
