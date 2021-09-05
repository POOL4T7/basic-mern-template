import React, { useState, useEffect, createRef } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { register } from "../../actions/userActions";
import ReCaptcha from "../../components/ReCaptcha";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import axios from "axios";

const RegisterScreen = ({ history, location }) => {
  const recaptchaRef = createRef();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    buttonText: "Submit",
    buttonDisable: false,
    message: "",
    emailError: "",
  });
  const {
    name,
    email,
    password,
    buttonText,
    buttonDisable,
    confirmPassword,
    message,
    emailError,
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
    const google_recaptcha_token = await recaptchaRef.current.executeAsync();
    setValues({ ...values, buttonText: "Submitting", buttonDisable: true });
    if (password !== confirmPassword) {
      setValues({ ...values, message: "Password do not match" });
    } else {
      try {
        const { data } = await axios.get(
          `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABSTRACT_API_KEY}&email=${email}`
        );
        console.log(data.is_smtp_valid && data.deliverability);
        if (data.is_smtp_valid === true && data.quality_score > 0.5) {
          await dispatch(
            register(name, email, password, google_recaptcha_token)
          );
          setValues({
            ...values,
            buttonText: "Submitted",
            buttonDisable: false,
          });
        } else {
          setValues({
            ...values,
            emailError: "Bad Email Address,Eenter a valid one",
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <GoogleLoginButton googleButtonText={"Register with Google"} />
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
            <small style={{ color: "red" }}>{emailError}</small>
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
      <ReCaptcha recaptchaRef={recaptchaRef} />
    </>
  );
};

export default RegisterScreen;
