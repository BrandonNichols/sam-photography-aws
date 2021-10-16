import AWS from "aws-sdk";

const creds = new AWS.Credentials(
  process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
);

AWS.config.update({
  apiVersion: "2006-03-01",
  region: "us-east-2",
  credentials: creds
});

export { AWS };
