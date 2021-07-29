import React, { useState } from "react";
import styled from "styled-components";
import { Amplify, Auth } from "aws-amplify";
import { connect } from "react-redux";
import { setAuthState } from "../actions";
import awsconfig from "../aws-exports";
import { AuthState } from "@aws-amplify/ui-components";

Amplify.configure(awsconfig);

const RequireNewPassword = (props) => {
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const submitNewPassword = (e) => {
    e.preventDefault();
    if (props.user.challengeName === "NEW_PASSWORD_REQUIRED") {
      Auth.completeNewPassword(props.user, newPassword)
        .then((user) => {
          props.setAuthState(AuthState.SignedIn);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form onSubmit={submitNewPassword}>
      <label>Change Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={handleChange}
        placeholder="input new password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    authState: state.authState
  };
};

export default connect(mapStateToProps, { setAuthState })(RequireNewPassword);
