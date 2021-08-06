import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import styled from "styled-components";

const DashBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Dashboard = (props) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setEmail(user.attributes.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DashBoardContainer>
      <h1>{`Hello ${email}`}</h1>
      <Link to="/update-email">Update Email</Link>
    </DashBoardContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(Dashboard);
