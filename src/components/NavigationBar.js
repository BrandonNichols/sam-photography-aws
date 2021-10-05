import { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import SignIn from "./SignIn";
import RequireNewPassword from "./RequireNewPassword";
import UploadImage from "./UploadImage";
import Home from "./Home";
import ChangeEmail from "./ChangeEmail";
import PrivateRoute from "../utils/PrivateRoute";
import { setAuthState, setUser } from "../actions";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";

const NavBar = styled.div`
  display: flex;
  * {
    margin: 0 5px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const HideSignIn = styled.div`
  display: ${(props) =>
    props.authState === AuthState.SignedIn ? "none" : "inline"};
`;

const NavigationBar = (props) => {
  function onLoad() {
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
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div>
      <NavContainer>
        <NavBar>
          <HideSignIn authState={props.authState}>
            <Link to="/sign-in">Sign In</Link>
          </HideSignIn>
        </NavBar>
      </NavContainer>

      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute
          path="/upload-image"
          component={UploadImage}
          authState={props.authState}
        />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/new-password" component={RequireNewPassword} />
        <Route path="/update-email" component={ChangeEmail} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.authState,
    user: state.currentUser
  };
};

export default connect(mapStateToProps, { setAuthState, setUser })(
  NavigationBar
);
