import { Col, Container, NavLink, Row, Stack } from "react-bootstrap";

const SiteFooter = () => {
  return (
    <>
      <footer>
        <Container className="bg-dark" fluid>
          <Row>
            <Col className="bg-dark p-4 text-white">
              <Stack>
                <h3>THE SITE </h3>
                <h5>The greatest portfolio ever.... WIP</h5>
              </Stack>
            </Col>
            <Col className="bg-dark p-4 text-white">
              <h3>Useful Links</h3>
              <NavLink className="text-white">
                <h5>About</h5>
              </NavLink>
            </Col>
            <Col className="bg-dark p-4 text-white">
              <h3>Contact us</h3>
              <h5>Gregrjohnson1@gmail.com</h5>
              <h5>1-800-phone number</h5>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default SiteFooter;
