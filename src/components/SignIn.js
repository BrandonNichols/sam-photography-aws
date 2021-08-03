import React, { useState } from "react";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, setAuthState } from "../actions";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 18.75rem;
`;

const SignIn = (props) => {
  const [formValue, setFormValue] = useState("");

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Auth.signIn(formValue.email, formValue.password)
      .then((user) => {
        props.setUser(user);
        if (
          user.challengeName &&
          user.challengeName === "NEW_PASSWORD_REQUIRED"
        ) {
          props.setAuthState(AuthState.ResetPassword);
          props.history.push("/new-password");
        } else {
          props.setAuthState(AuthState.SignedIn);
          props.history.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <label>
          <h1>Sign in</h1>
        </label>
        <input
          type="email"
          name="email"
          value={formValue.email || ""}
          onChange={handleChange}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          value={formValue.password || ""}
          onChange={handleChange}
          placeholder="password"
        />
        <button type="submit"> Submit </button>
      </Form>
    </div>
  );
};

export default withRouter(connect(null, { setUser, setAuthState })(SignIn));
