import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Container, Row, Col } from "react-bootstrap";

const token = localStorage.getItem("token");
export default function UserInfo(props) {
  const [user, setUser] = useState(props.user);

  let _id;
  if (token) {
    _id = jwt_decode(token)._id;
  }

  const follow = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${localStorage.getItem("URL")}/follow/${user._id}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      alert(error);
    }
  };
  const unFollow = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${localStorage.getItem("URL")}/unfollow/${user._id}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    return () => {
      setUser({});
    };
  }, []);

  const printOptions = () => {
    if (_id !== user._id) {
      return (
        <IsNotMe
          unFollow={unFollow}
          follow={follow}
          user_id={user._id}
          my_id={_id}
          follows={user.followers}
        />
      );
    }
    return <IsMe />;
  };

  return (
    <div className="user-info__info">
      <h4>{user.userName}</h4>
      {printOptions()}
    </div>
  );
}

const IsMe = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Link to="/create">
            <svg fill="#262626" height="50px" width="50px">
              <path
                clipRule="evenodd"
                d="M38.5 46h-29c-5 0-9-4-9-9V17c0-5 4-9 9-9h1.1c1.1 0 2.2-.6 2.7-1.7l.5-1c1-2 3.1-3.3 5.4-3.3h9.6c2.3 0 4.4 1.3 5.4 3.3l.5 1c.5 1 1.5 1.7 2.7 1.7h1.1c5 0 9 4 9 9v20c0 5-4 9-9 9zm6-29c0-3.3-2.7-6-6-6h-1.1C35.1 11 33 9.7 32 7.7l-.5-1C31 5.6 29.9 5 28.8 5h-9.6c-1.1 0-2.2.6-2.7 1.7l-.5 1c-1 2-3.1 3.3-5.4 3.3H9.5c-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6h29c3.3 0 6-2.7 6-6V17zM24 38c-6.4 0-11.5-5.1-11.5-11.5S17.6 15 24 15s11.5 5.1 11.5 11.5S30.4 38 24 38zm0-20c-4.7 0-8.5 3.8-8.5 8.5S19.3 35 24 35s8.5-3.8 8.5-8.5S28.7 18 24 18z"
                fillRule="evenodd"
              ></path>
            </svg>
          </Link>
        </Col>
        <Col>
          <Link to="/edit/profile">Edit Profile</Link>
        </Col>
        <Col>
          <button
            style={{ color: "#ff1a1a" }}
            onClick={async () => {
              await localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Log Out
          </button>
        </Col>
      </Row>
    </Container>
  );
};

const IsNotMe = (props) => {
  const { follows, my_id, user_id, follow, unFollow } = props;
  const isFollowing = follows.findIndex((user) => user === my_id);

  if (isFollowing >= 0) {
    return (
      <Container>
        <Row>
          <Col>
            <Link to={{ pathname: "/messages", aboutProps: { for: user_id } }}>
              Send message
            </Link>
          </Col>
          <Col>
            <button onClick={unFollow}>Unfollow</button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <button onClick={follow}>Follow</button>
        </Col>
      </Row>
    </Container>
  );
};
