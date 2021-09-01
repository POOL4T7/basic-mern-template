import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";

const RegisterScreen = ({ history, location }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    buttonText: "Submit",
    buttonDisable: false,
    message: "",
  });
  const {
    name,
    email,
    password,
    buttonText,
    buttonDisable,
    confirmPassword,
    message,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Submitting", buttonDisable: true });
    if (password !== confirmPassword) {
      setValues({ ...values, message: "Password do not match" });
    } else {
      await dispatch(register(name, email, password));
      setValues({ ...values, buttonText: "Submitted", buttonDisable: false });
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={name}
              autoFocus
              onChange={handleChange("name")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleChange("email")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange("password")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>confirmPassword</Form.Label>
            <Form.Control
              type="confirmPassword"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={buttonDisable}
            onClick={clickSubmit}
          >
            {buttonText}
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
          Already have an account ?{" "}
            <Link to={redirect ? `/login?redirect?=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
