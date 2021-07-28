import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setUser, setAuthState } from "../actions";
import { Amplify, Auth } from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifyRequireNewPassword
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import RequireNewPassword from "./RequireNewPassword";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 18.75rem;
`;

// const Login = (props) => {
//   const [formValue, setFormValue] = useState({});

//   const handleChange = (e) => {
//     setFormValue({ [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     props.signIn();
//   };

//   return (
//     <div>
//       <Form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           value={formValue.email}
//           onChange={handleChange}
//           placeholder="email"
//         />
//         <input
//           type="password"
//           name="password"
//           value={formValue.password}
//           onChange={handleChange}
//           placeholder="password"
//         />
//         <button type="submit"> Submit </button>
//       </Form>
//       <h1>{`Logged In: ${props.loginStatus}`}</h1>
//     </div>
//   );
// };

const currentState = (props) => {
  if (props.user) {
    console.log(props.user);
    if (props.authState === AuthState.ResetPassword) {
      return <RequireNewPassword />;
    } else if (props.authState === AuthState.SignedIn) {
      return (
        <div>
          <h1>{`Hello ${props.user.username}`}</h1>
          <AmplifySignOut />
        </div>
      );
    }
  }

  return (
    <div>
      {console.log(`${props.authState}`)}
      {console.log(props.user)}
      <AmplifySignIn hideSignUp usernameAlias="email" />
      <AmplifySignOut />
    </div>
  );
};

const Login = (props) => {
  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      props.setAuthState(nextAuthState);
      props.setUser(authData);
    });
  }, [props]);

  // return props.authState === AuthState.SignedIn && props.user ? (
  //   <div>
  //     <h1>{`Hello ${props.user.username}`}</h1>
  //     <AmplifySignOut />
  //   </div>
  // ) : (
  //   <div>
  //     {console.log(`${props.authState}`)}
  //     {console.log(props.user)}
  //     <AmplifySignIn hideSignUp usernameAlias="email" />
  //     <AmplifySignOut />
  //   </div>
  // );
  return currentState(props);
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    authState: state.authState
  };
};

export default connect(mapStateToProps, { setUser, setAuthState })(Login);
