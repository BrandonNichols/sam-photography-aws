import React, { useState } from "react";
import styled from "styled-components";
import { Amplify, Auth } from "aws-amplify";
import { connect } from "react-redux";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

const RequireNewPassword = (props) => {
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const submitNewPassword = (e) => {
    e.preventDefault();
    if (props.user.challengeName === "NEW_PASSWORD_REQUIRED") {
      Auth.completeNewPassword(props.user, newPassword);
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
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(RequireNewPassword);
