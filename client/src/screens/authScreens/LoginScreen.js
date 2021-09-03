import React, { useState, useEffect, createRef } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { login } from "../../actions/userActions";
import ReCaptcha from "../../components/ReCaptcha";

const LoginScreen = ({ history, location }) => {
  const recaptchaRef = createRef();
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
    buttonDisable: false,
  });
  const { email, password, buttonText, buttonDisable } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    const google_recaptcha_token = await recaptchaRef.current.executeAsync();
    setValues({ ...values, buttonText: "Submitting", buttonDisable: true });
    await dispatch(login(email, password, google_recaptcha_token));
    setValues({ ...values, buttonText: "Try again", buttonDisable: false });
  };

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form>
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
            New Customer?
            <Link
              to={redirect ? `/register?redirect?=${redirect}` : "/register"}
            >
              {" "}
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
      <ReCaptcha recaptchaRef={recaptchaRef} />
    </>
  );
};

export default LoginScreen;
