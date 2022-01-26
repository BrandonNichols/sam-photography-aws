import React, { useState } from "react";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import styled from "styled-components";

const NotificationContainer = styled.div`
  display: ${(props) => (props.show ? "inline" : "none")};
`;

const LoadingIcon = styled.h1`
  display: ${(props) => (props.show ? "inline" : "none")};
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ChangeEmail = (props) => {
  const [newEmail, setNewEmail] = useState("");
  const [changeNotification, setChangeNotification] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [emailUpdateStatus, setEmailUpdateStatus] = useState(false);

  const handleChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setChangeNotification(false);
    setLoadingIcon(true);
    try {
      await Auth.updateUserAttributes(props.user, {
        email: newEmail
      });
      setLoadingIcon(false);
      setChangeNotification(true);
      setEmailUpdateStatus(true);
    } catch (err) {
      console.log(err);
      setLoadingIcon(false);
      setChangeNotification(true);
      setEmailUpdateStatus(false);
    }
  };
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <label>
          <h1>Update Email Address</h1>
        </label>
        <input
          type="email"
          value={newEmail}
          placeholder="New Email Address"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <LoadingIcon show={loadingIcon}> Loading </LoadingIcon>
      <NotificationContainer show={changeNotification}>
        {emailUpdateStatus ? (
          <h1>Email has been successfully updated</h1>
        ) : (
          <h1>Email failed to be updated</h1>
        )}
      </NotificationContainer>
    </FormContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(ChangeEmail);
