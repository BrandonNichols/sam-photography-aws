import React, { useState } from "react";
import { Auth } from "aws-amplify";

const ChangeEmail = () => {
  const [email, setEmail] = useState("");
  const [successfulChange, setSuccessfulChange] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.currentAuthenticatedUser()
      .then((user) => {
        Auth.updateUserAttributes(user, { email: email })
          .then((user) => {
            setSuccessfulChange(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return successfulChange ? (
    <div>Successfully Updated Email</div>
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter New Email"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChangeEmail;
