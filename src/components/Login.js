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

  return (
    <Form>
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
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginStatus
  };
};

export default connect(mapStateToProps, { signIn })(Login);
