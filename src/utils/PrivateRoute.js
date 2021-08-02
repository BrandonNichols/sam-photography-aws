import React from "react";
import { Route, withRouter } from "react-router-dom";
import { AuthState } from "@aws-amplify/ui-components";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        rest.authState === AuthState.SignedIn ? (
          <Component {...props} />
        ) : (
          rest.history.push("/sign-in")
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    authState: state.authState
  };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
