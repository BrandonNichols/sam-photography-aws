import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";
import { setAuthState, setUser } from "../actions";
import styled from "styled-components";
import flowerBorder from "../images/6BTarRoi8.svg";

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: min-content;
  border: 50px solid black;
  border-image-source: url(${flowerBorder});
  border-image-slice: 88 0 0 0;
  z-index: 1;
  text-align: center;
  height: 15rem;
  justify-content: space-evenly;
`;

const StyledLink = styled(Link)`
  font-family: "Montserrat", sans-serif;
  color: ${(props) =>
    props.to === window.location.pathname ? "orange" : "black"};
  text-decoration: none;
`;

const StyledButton = styled.button`
  position: absolute;
  left: 0;
  border-radius: 10px;
  border: 1px solid white;
  height: 2.1rem;
  width: 101%;
  padding: 0;
  background-color: transparent;
`;

const SignOutText = styled.p`
  margin: 0;
  padding: 3%;
`;

const ButtonContainer = styled.div`
  position: relative;
  height: 2rem;
`;

const ButtonBorder = styled.div`
  position: absolute;
  border: 1px solid black;
  height: 2rem;
  width: 100%;
`;

const Sidebar = (props) => {
  const [email, setEmail] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      props.setAuthState(AuthState.SignedOut);
      props.setUser({});
      props.history.push("/");
    } catch (err) {
      console.log("error signing out: ", err);
    }
  }

  const handleButtonEnter = (e) => {
    const button = e.target;
    if (button.nodeName === "BUTTON") {
      button.animate(
        [{ transform: "scale(1.0, 1.0)" }, { transform: "scale(0.9, 0.9)" }],
        { duration: 500, fill: "forwards" }
      );
    }
  };

  const handleButtonLeave = (e) => {
    const button = e.target.parentNode.children[1];
    if (button.nodeName === "BUTTON") {
      button.animate(
        [{ transform: "scale(0.9, 0.9)" }, { transform: "scale(1.0, 1.0)" }],
        { duration: 500, fill: "forwards" }
      );
    }
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setEmail(user.attributes.email);
        setShowSidebar(true);
      })
      .catch((err) => {
        console.log(err);
        setShowSidebar(false);
      });
  }, [props.user]);

  return showSidebar ? (
    <div>
      <SideBarContainer>
        <p>{`Hello ${email}`}</p>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/update-email">Update Email</StyledLink>
        <StyledLink to="/organize-images">Organize Images</StyledLink>
        <ButtonContainer
          onMouseEnter={handleButtonEnter}
          onMouseLeave={handleButtonLeave}
        >
          <ButtonBorder />
          <StyledButton onClick={signOut} />
          <SignOutText>Sign Out</SignOutText>
        </ButtonContainer>
      </SideBarContainer>
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { setAuthState, setUser })
)(Sidebar);
