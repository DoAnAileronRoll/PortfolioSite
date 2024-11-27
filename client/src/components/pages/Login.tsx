import React, { useState } from "react";
import {
  Col,
  Form,
  FormGroup,
  Nav,
  NavItem,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import BasicToast from "../BasicToast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext, CurrentUserContextType } from "../MainNavBar";

interface LoginProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
}

const Login = ({ setCurrentUser }: LoginProps) => {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [errorToastShow, setErrorToastShow] = useState(false);
  const navigate = useNavigate();

  const loginAccountAsync = async (e: React.MouseEvent) => {
    if (email !== "" && userName !== "") {
      e.preventDefault();

      const loginAccount = {
        Email: email,
        Username: userName,
      };

      const result = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginAccount),
      });

      const resultJson = await result.json();

      if (result.status === 200) {
        console.log(currentUser);

        var curUser: CurrentUserContextType = {
          FirstName: resultJson.Body.FirstName,
          LastName: resultJson.Body.LastName,
          Email: resultJson.Body.Email,
          Username: resultJson.Body.Username,
          UserID: resultJson.Body.UserID,
          AccountType: resultJson.UserID === 1 ? 1 : 0,
        };

        setCurrentUser(curUser);
        console.log(currentUser);
        navigate("/");
      } else {
        setErrorToastShow(true);
      }
    } else {
      setErrorToastShow(true);
    }
  };

  return (
    <>
      <Stack>
        <h1 className="mx-auto">LOGIN</h1>
        <p className="mx-auto">Gain access to THE SITE functions.</p>
        <p className="mx-auto">More added every FIGHTNIGHT.</p>
        <p className="mx-auto">We appreciate your patience.</p>

        <Form className="mx-auto">
          <Form.Group className="mb-3 bg-dark" controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3 bg-dark" controlId="userName">
            <Form.Control
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Username"
            />
          </Form.Group>
          <Row>
            <Col>
              <Nav.Link onClick={(e) => loginAccountAsync(e)}>Login</Nav.Link>
            </Col>
            <Col>
              <Nav.Link as={Link} to={"/create"}>
                Create Account
              </Nav.Link>
            </Col>
          </Row>
        </Form>
      </Stack>
      {errorToastShow && (
        <BasicToast
          bodyText={"Error in login."}
          onClick={() => setErrorToastShow(false)}
          titleText="USER ERROR"
        />
      )}
    </>
  );
};

export default Login;
