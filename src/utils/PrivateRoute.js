import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { setAuthState } from "../actions";
import { setUser } from "../actions";
import { Route, withRouter, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const checkToken = async (session) => {
    let validToken = false;
    const tokenExpire = session.accessToken.payload.exp * 1000;
    const expired = Date.now() >= tokenExpire ? true : false;

    if (!expired) {
      await fetch(process.env.REACT_APP_JWK_LINK)
        .then((response) => response.json())
        .then((data) => {
          const pem = jwkToPem(data.keys[1]);
          const token = session.accessToken.jwtToken;
          const payload = session.accessToken.payload;
          const iss = payload.iss;

          jwt.verify(
            token,
            pem,
            {
              issuer: iss
            },
            function (err, decoded) {
              if (err) {
                console.log(err);
              } else {
                validToken = true;
                console.log("successful token verification");
              }
            }
          );
        });
    }

    return validToken;
  };
  const getCurrentSession = async () => {
    try {
      const session = await Auth.currentSession();
      if (!checkToken(session)) {
        rest.setAuthState(AuthState.SignedOut);
        rest.setUser({});
        rest.history.push("/sign-in");
      }
      rest.setAuthState(AuthState.SignedIn);
      return true;
    } catch (error) {
      console.log(error);
      rest.setAuthState(AuthState.SignedOut);
      rest.history.push("/sign-in");
      return false;
    }
  };

  if (getCurrentSession()) {
    return <Route {...rest} component={Component} />;
  } else {
    return <Redirect to="/sign-in" />;
  }
};

export default compose(
  connect(null, { setAuthState, setUser }),
  withRouter
)(PrivateRoute);
