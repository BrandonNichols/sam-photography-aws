import React from "react";
import { connect } from "react-redux";
import { setAuthState, setUser } from "../actions";
import { Route, withRouter } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        <Component {...props} />;
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.authState
  };
};

export default withRouter(
  connect(mapStateToProps, { setAuthState, setUser })(PublicRoute)
);
