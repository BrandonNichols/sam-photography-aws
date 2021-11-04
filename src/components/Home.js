import styled from "styled-components";
import { connect } from "react-redux";

const CenteredDiv = styled.div`
  width: min-content;
  min-width: 100px;
  min-height: 100px;
  background-color: red;
  margin: 0 auto;
`;

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

const Home = (props) => {
  return (
    <div>
      <h1>HOME</h1>
      {props.imageContainers.map((imgObj, index) => {
        return (
          <CenteredDiv key={index}>
            <Image src={`${imgObj.base64Image}`} alt="" />
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

export default connect(mapStateToProps, null)(Home);
