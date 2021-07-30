import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setUser, setAuthState } from "../actions";
import { Amplify, Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";
import RequireNewPassword from "./RequireNewPassword";
import SignIn from "./SignIn";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

const Login = (props) => {
  return currentState(props);
};

const currentState = (props) => {
  if (props.user) {
    if (props.authState === AuthState.ResetPassword) {
      return <RequireNewPassword />;
    } else if (props.authState === AuthState.SignedIn) {
      const email = props.user.signInUserSession.idToken.payload.email;
      return (
        <div>
          <h1>{`Hello ${email}`}</h1>
        </div>
      );
    }
  }

  return <SignIn />;
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    authState: state.authState
  };
};

export default connect(mapStateToProps, { setUser, setAuthState })(Login);
