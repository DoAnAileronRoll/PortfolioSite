import React, {useState } from "react";
import { Col, FormGroup, Nav, Row, Stack } from "react-bootstrap";
//import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import { Link, Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import BasicToast from "../BasicToast";

const CreateAccount = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorToastShow, setErrorToastShow] = useState(false);

  const navigate = useNavigate();

  const submitNewAccount = async (e: React.MouseEvent) => {
    console.log("Attempting to Submit New Account");
    e.preventDefault();
    
    const newAccount = {
      Email: email,
      Username: userName,
      FirstName: firstName,
      LastName: lastName,
    };

    const result = await fetch("http://localhost:8080/user/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    });
    if (result.status === 200) {
      navigate("/login");
    } else {
      setErrorToastShow(true);
    }
    const resultJson = await result.json();
    console.log(resultJson);
  };

  return (
    <>
      <Stack>
        <h1 className="mx-auto">CREATE ACCOUNT</h1>
        <p className="mx-auto">Gain access to THE SITE functions.</p>
        <p className="mx-auto">More added every FIGHTNIGHT.</p>
        <p className="mx-auto">We appreciate your patience.</p>

        <Form className="mx-auto">
          <Form.Group className="mb-3  " controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="userName">
            <Form.Control
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Username"
            />
          </Form.Group>

          <Row>
            <Col>
              <FormGroup controlId="firstName">
                <Form.Control
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup controlId="lastName">
                <Form.Control
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </FormGroup>
            </Col>
          </Row>
          
          <Nav.Link className="mx-auto"
            onClick={(e) => submitNewAccount(e)}
          >
            Submit
          </Nav.Link>
        </Form>
        {errorToastShow && (
          <BasicToast
            bodyText={"Error in account creation."}
            onClick={() => setErrorToastShow(false)}
            titleText="USER ERROR"
          />
        )}
      </Stack>
    </>
  );
};

export default CreateAccount;
