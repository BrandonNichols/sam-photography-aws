import React, { useState } from "react";
import { Auth } from "aws-amplify";

const Dashboard = (props) => {
  return props.user ? (
    <h1>{`Hello ${props.user.attributes.email}`}</h1>
  ) : (
    <h1>Loading</h1>
  );
};

export default Dashboard;
