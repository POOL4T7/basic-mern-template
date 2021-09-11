import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constrants/userConstrants";

const ProfileScreen = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    buttonText: "Update",
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
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success, error: profileUpdateError } = userProfileUpdate;

  useEffect(() => {
    if (success || profileUpdateError) {
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
      }, 3000);
    }
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setValues({ ...values, name: user.name, email: user.email });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history, profileUpdateError, success, user, userInfo]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Updating", buttonDisable: true });
    if (password !== confirmPassword) {
      setValues({ ...values, message: "Password do not match" });
    } else {
      await dispatch(
        updateUserProfile({ _id: user._id, name, email, password })
      );
      setValues({ ...values, buttonText: "Updated", buttonDisable: false });
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {message && <Message variant="danger">{message}</Message>}
        {profileUpdateError && (
          <Message variant="danger">{profileUpdateError}</Message>
        )}
        {success && (
          <Message variant="success">Profile updated successfully</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={name}
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
              disabled
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
      </Col>
      <Col md={9} className="text-center ">
        <h1>Show any thing </h1>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
