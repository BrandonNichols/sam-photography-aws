import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";
import { setAuthState, setUser } from "../actions";
import styled from "styled-components";

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: min-content;
  border: 1px dotted black;
  z-index: 1;
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
        <Link to="/">Home</Link>
        <Link to="/update-email">Update Email</Link>
        <Link to="/upload-image">Upload Image</Link>
        <button onClick={signOut}>Sign Out</button>
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
