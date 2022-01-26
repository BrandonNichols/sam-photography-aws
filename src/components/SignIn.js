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
  align-items: center;
  justify-content: space-around;
  height: 230px;
`;

const SignInContainer = styled.div`
  margin: 0 auto;
  width: min-content;
  text-align: center;
`;

const SubmitButton = styled.button`
  border: 1px solid green;
  color: green;
  background-color: transparent;
  width: 50%;
  border-radius: 10px;
  height: 50px;
  font-weight: bold;

  &:hover {
    background-color: green;
    color: white;
  }
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
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SignInContainer>
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
        <SubmitButton type="submit"> Submit </SubmitButton>
      </Form>
    </SignInContainer>
  );
};

export default withRouter(connect(null, { setUser, setAuthState })(SignIn));
