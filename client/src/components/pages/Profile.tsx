import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useContext } from "react";
import { CurrentUserContext, CurrentUserContextType } from "../MainNavBar.js";

import { useNavigate } from "react-router-dom";

interface ProfileProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserContextType>>;
}

const Profile = ({ setCurrentUser }: ProfileProps) => {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  const logOutAccount = () => {
    const loggedOutUser: CurrentUserContextType = {
      FirstName: null,
      LastName: null,
      Email: null,
      Username: null,
      UserID: null,
      AccountType: null,
    };

    setCurrentUser(loggedOutUser);
    navigate("/");
  };

  return (
    <>
      <Stack>
        <h1 className="mx-auto">PROFILE</h1>
        {currentUser.UserID === null && <p>IDK HOW U GOT HERE BUT LEAVE</p>}
        <p className="mx-auto">
          Welcome back {currentUser.FirstName} {currentUser.LastName}
        </p>
        <p className="mx-auto">
          Your Username is {currentUser.Username} and your UserID is{" "}
          {currentUser.UserID}
        </p>
        <p className="mx-auto">Your Email is {currentUser.Email}</p>

        <p className="mx-auto">We appreciate your patience.</p>

        <Button className="mx-auto mb-2"
          variant="dark"
          onClick={() => logOutAccount()}> 
          <h5>LOGOUT</h5></Button>
      </Stack>
    </>
  );
};

export default Profile;
