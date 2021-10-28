import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
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
  return (
    <div>
      <NavContainer>
        <NavBar>
          <HideSignIn authState={props.authState}>
            <Link to="/sign-in">Sign In</Link>
          </HideSignIn>
        </NavBar>
      </NavContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.authState
  };
};

export default connect(mapStateToProps, null)(NavigationBar);
