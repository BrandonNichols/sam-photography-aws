import { useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { connect } from "react-redux";
import { fetchBucket } from "../actions";

const HomeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 18rem;
`;

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const CenteredDiv = styled.div`
  display: flex;
  min-width: 100px;
  min-height: 100px;
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  margin: 500px 0;
`;

const Title = styled.h2`
  animation: ${fadeIn} 2s;
  padding: 100px;
`;

const Image = styled.img`
  padding: 100px;
  max-width: 500px;
  max-height: 500px;
  animation: ${fadeIn} 2s;
`;

const QuickScrollContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  height: min-content;
  background-color: black;
  opacity: 0.5;

  a {
    text-decoration: none;
    color: white;
    margin: 10px 0;
    margin-left: 5px;
  }
`;

const Home = (props) => {
  const homeSection = useRef(new Array(props.imageContainers.length));

  useEffect(() => {
    props.fetchBucket();
  }, []);

  useEffect(() => {
    const current = homeSection.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.children[0].style.display = "inline";
          entry.target.children[1].style.display = "inline";
        } else {
          entry.target.children[0].style.display = "none";
          entry.target.children[1].style.display = "none";
        }
      });
    });

    if (current.length) {
      for (let i = 0; i < current.length; i++) {
        observer.observe(current[i]);
      }
    }

    return () => observer.disconnect();
  });

  return (
    <HomeWrapper>
      {props.imageContainers.map((imgObj, index) => {
        return (
          <CenteredDiv
            key={index}
            ref={(el) => (homeSection.current[index] = el)}
            id={`${imgObj["photo-name"]}`}
          >
            <Image src={imgObj.link} alt="" />
            <Title>{imgObj["photo-name"]}</Title>
          </CenteredDiv>
        );
      })}
      <QuickScrollContainer>
        {props.imageContainers.map((imgObj, index) => {
          return (
            <a key={index} href={`#${imgObj["photo-name"]}`}>
              {imgObj["photo-name"]}
            </a>
          );
        })}
      </QuickScrollContainer>
    </HomeWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    imageContainers: state.images
  };
};

export default connect(mapStateToProps, { fetchBucket })(Home);
