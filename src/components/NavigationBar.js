import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import UploadImage from "./UploadImage";
import Home from "./Home";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import Dashboard from "./Dashboard";
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

const NavigationBar = (props) => {
  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      props.setAuthState(AuthState.SignedOut);
      props.setUser({});
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <div>
      <NavContainer>
        <NavBar>
          <Link to="/">Home</Link>
          <Link to="/upload-image">Upload Image</Link>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/change-email">Change Email</Link>
          <Link to="/change-password">Change Password</Link>
          <Link to="/Dashboard">Dashboard</Link>
        </NavBar>
        {props.authState === AuthState.SignedIn && props.user ? (
          <button onClick={signOut}>Sign Out</button>
        ) : null}
      </NavContainer>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/upload-image" component={UploadImage} />
        <Route path="/sign-in" component={Login} />
        <Route path="/change-email" component={ChangeEmail} />
        <Route path="/change-password" component={ChangePassword} />
        <Route path="/Dashboard" component={Dashboard} />
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
