import React, { useState } from "react";
import { connect } from "react-redux";

const Dashboard = (props) => {
  return props.user ? (
    <h1>{`Hello ${props.user.attributes.email}`}</h1>
  ) : (
    <h1>Loading</h1>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(Dashboard);
