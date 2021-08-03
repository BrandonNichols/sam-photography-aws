import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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

export default withRouter(connect(mapStateToProps)(Dashboard));
