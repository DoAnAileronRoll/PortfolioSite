import React from "react";
import { NavItem, Stack } from "react-bootstrap";
import { useContext } from "react";
import { CurrentUserContext, CurrentUserContextType } from "../MainNavBar";

import { useNavigate } from "react-router-dom";

interface ProfileProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
}

const Profile = ({ setCurrentUser }: ProfileProps) => {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  const logOutAccount = () => {
    var loggedOutUser: CurrentUserContextType = {
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

        <NavItem
          className="mx-auto"
          //type="submit"
          onClick={() => logOutAccount()}
          // as={Link}
          // to={"/"}
        >
          LOGOUT
        </NavItem>
      </Stack>
    </>
  );
};

export default Profile;
