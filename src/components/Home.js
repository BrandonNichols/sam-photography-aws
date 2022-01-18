import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { connect, useSelector } from "react-redux";
import { fetchBucket } from "../actions";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 18rem;
`;

const CenteredDiv = styled.div`
  min-width: 100px;
  min-height: 100px;
  align-self: flex-start;
  &:nth-child(even) {
    align-self: flex-end;
  }
  margin: 500px 0;
`;

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const Image = styled.img`
  max-width: 500px;
  max-height: 500px;
  animation: ${fadeIn} 2s;
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
          entry.target.children[0].style.display = "flex";
        } else {
          entry.target.children[0].style.display = "none";
        }
        // console.log(entry);
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
          >
            <Image src={imgObj.link} alt="" />
          </CenteredDiv>
        );
      })}
    </HomeWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    imageContainers: state.images
  };
};

export default connect(mapStateToProps, { fetchBucket })(Home);
