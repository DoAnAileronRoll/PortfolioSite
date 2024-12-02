import React from "react";
import { Col, Container, Nav, NavLink, Row, Stack } from "react-bootstrap";

const SiteFooter = () => {
  return (
    <>
      <footer>
        <Container className="bg-dark" fluid>
          <Row>
            <Col className="bg-dark mx-5 p-4 text-white">
              <Stack>
                <h2>THE SITE </h2>
                <p>The greatest portfolio ever.... WIP</p>
              </Stack>
            </Col>
            <Col className="bg-dark mx-5 p-4 text-white">
              Useful Links
              <Nav className="flex-column fs-5">
                <NavLink className="text-white">About</NavLink>
              </Nav>
            </Col>
            <Col className="bg-dark mx-5 p-4 text-white">
              <h1>Contact us</h1>
              <p>Gregrjohnson1@gmail.com</p>
              <p>1-800-phone number</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default SiteFooter;
