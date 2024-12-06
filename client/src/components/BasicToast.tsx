import { ToastContainer } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

interface BasicToastProps {
  onClick: () => void;
  titleText: string;
  bodyText: string;

}

function BasicToast({ onClick, titleText, bodyText: text }: BasicToastProps) {
  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position="bottom-center">
          <Toast bg="dark" onClose={onClick} delay={3000} autohide animation={true}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{titleText}</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body className="text-white">{text}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

export default BasicToast;
