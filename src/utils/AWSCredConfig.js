import AWS from "aws-sdk";

const creds = new AWS.Credentials(
  process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
);

AWS.config.update({
  region: "us-east-2",
  credentials: creds
});

export { AWS };
