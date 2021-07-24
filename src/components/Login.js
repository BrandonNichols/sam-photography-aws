import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signIn } from "../actions";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 18.75rem;
`;

const Login = (props) => {
  const [formValue, setFormValue] = useState({});

  const handleChange = (e) => {
    setFormValue({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button type="submit"> Submit </button>
      </Form>
      <h1>{`Logged In: ${props.loginStatus}`}</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginStatus
  };
};

export default connect(mapStateToProps, { signIn })(Login);
