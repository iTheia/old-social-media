import React from "react";
import { useHistory, Switch, Link, Route } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import useInput from "../hooks/useInput";
import axios from "axios";

const baseURL = localStorage.getItem("URL");
const token = localStorage.getItem("token");

export default function Login() {
  const history = useHistory();

  if (token) {
    history.push("/");
  }

  return (
    <div className="page login">
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col className="d-none d-lg-block">
            <img className="contained" src="/images/woman.jpg" alt="" />
          </Col>
          <Col>
            <Switch>
              <Route exact path={`/login`} component={LoginForm} />
              <Route path={`/login/register`} component={RegisterForm} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const LoginForm = () => {
  const [user, bindUser, cleanUp] = useInput({
    name: "",
    email: "",
    password: "",
    userName: "",
  });
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}signIn`, user);
      const token = await response.data;
      localStorage.setItem("token", token);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Row>
      <Container>
        <h1>Social Media</h1>
        <Form autoComplete="off">
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl name="email" type="email" {...bindUser}></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              name="password"
              type="password"
              {...bindUser}
            ></FormControl>
          </FormGroup>
          <Button variant="primary" onClick={login}>
            Login
          </Button>
        </Form>
        <Link
          style={{ fontSize: "14px", marginTop: "10px", opacity: ".7" }}
          to={`/login/register`}
        >
          Dont have an account? REGISTER
        </Link>
      </Container>
    </Row>
  );
};

const RegisterForm = () => {
  const [user, bindUser, cleanUp] = useInput({
    name: "",
    email: "",
    password: "",
    userName: "",
  });

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}signUp`, user);
      localStorage.setItem("token", response.data);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Row>
      <Container>
        <h1>Social Media</h1>
        <Form autoComplete="off">
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl type="email" name="email" {...bindUser}></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl name="name" type="text" {...bindUser}></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>User name</FormLabel>
            <FormControl
              name="name"
              name="userName"
              type="text"
              {...bindUser}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              name="password"
              {...bindUser}
            ></FormControl>
          </FormGroup>
          <Button variant="primary" onClick={register}>
            Register
          </Button>
        </Form>
        <Link
          style={{ fontSize: "14px", marginTop: "10px", opacity: ".7" }}
          to={`/login`}
        >
          Have an account? LOGIN
        </Link>
      </Container>
    </Row>
  );
};
