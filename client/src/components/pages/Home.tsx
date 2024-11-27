import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import { useContext } from "react";
import { CurrentUserContext } from "../MainNavBar";

const Home = () => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <Stack>
        <h1 className="mx-auto">HOME</h1>
        {currentUser.UserID === null ? (
          <p className="mx-auto">Welcome to THE SITE.</p>
        ) : (
          <p className="mx-auto">Welcome back {currentUser.FirstName}.</p>
        )}
        <p className="mx-auto">We are currently under construction. </p>
        <p className="mx-auto">We appreciate your patience.</p>
      </Stack>
    </>
  );
};

export default Home;
