import React, { useState } from "react";
import { Button, Modal, Row, Col, Container } from "react-bootstrap";

const Inbox = (props) => {
  const { printFollows } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="message-area inbox">
      <h2>You can send messages to people that you follow</h2>
      <Button onClick={handleShow} variant="primary">
        Send a message
      </Button>
      <Modal size="md" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <h3>Start a new Chat</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col style={{ padding: "10px" }}>{printFollows()}</Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Inbox;
