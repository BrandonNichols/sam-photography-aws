import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setUser, setAuthState } from "../actions";
import { Amplify, Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";
import RequireNewPassword from "./RequireNewPassword";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
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
      return <Dashboard />;
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
