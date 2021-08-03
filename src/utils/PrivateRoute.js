import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { AuthState } from "@aws-amplify/ui-components";

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (rest.authState === AuthState.SignedIn) {
    return <Route {...rest} component={Component} />;
  } else {
    return <Redirect to="/sign-in" />;
  }
};

export default withRouter(PrivateRoute);
