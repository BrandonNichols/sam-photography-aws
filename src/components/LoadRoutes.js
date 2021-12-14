import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import SignIn from "./SignIn";
import RequireNewPassword from "./RequireNewPassword";
import Home from "./Home";
import ChangeEmail from "./ChangeEmail";
import OrganizeImages from "./OrganizeImages";
import { connect } from "react-redux";
import { setAuthState, setUser } from "../actions";
import { Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";

const LoadRoute = (props) => {
  const onLoad = () => {
    Auth.currentSession()
      .then((data) => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            props.setUser(user);
            props.setAuthState(AuthState.SignedIn);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Home {...props} />
      </Route>
      <PrivateRoute path="/organize-images" component={OrganizeImages} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/new-password" component={RequireNewPassword} />
      <Route path="/update-email" component={ChangeEmail} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  };
};

export default connect(mapStateToProps, { setUser, setAuthState })(LoadRoute);
