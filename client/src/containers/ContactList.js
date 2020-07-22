import React from "react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const token = localStorage.getItem("token");

const ContactList = (props) => {
  const { rooms, url } = props;

  let userId;
  if (token) {
    userId = jwtDecode(token)._id;
  }
  const selectContact = (users, messages) => {
    const contact = users.filter((user) => user._id !== userId)[0];
    return (
      <Container className="contact">
        <Row className="contact-row">
          <Col md={2} styles={{ padding: 0 }}>
            <img className="icon" src={`/images/${contact.avatar}`} alt="" />
          </Col>
          <Col styles={{ padding: 0 }}>
            <div>
              <strong>{contact.userName} </strong>
            </div>
            <div>{messages.map((message) => message.content)}</div>
          </Col>
        </Row>
      </Container>
    );
  };
  const printRooms = () =>
    rooms.map((room) => (
      <Link to={`${url}/${room._id}`} key={room._id} className="room">
        {selectContact(room.users, room.messages)}
      </Link>
    ));
  return <div className="contact-list">{printRooms()}</div>;
};

export default ContactList;
