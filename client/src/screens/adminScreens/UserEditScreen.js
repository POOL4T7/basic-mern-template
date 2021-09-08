import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getUserById } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer";
import { USER_UPDATE_RESET } from "../../constrants/userConstrants";

const accStatus = ["suspended", "active", "blocked"];

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [values, setValues] = useState({
    name: "",
    email: "",
    status: "",
    isAdmin: false,
    buttonText: "Submit",
    buttonDisable: false,
  });
  const { name, email, isAdmin, status } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdate;
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserById(userId));
      } else {
        setValues({
          ...values,
          name: user.name,
          email: user.email,
          status: user.status,
          isAdmin: user.isAdmin,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history, updateSuccess, user, userId]);

  const submithandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update User Profile</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          error && <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submithandler}>
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
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <select className="form-select">
                {accStatus.map((options) => (
                  <option value={options} selected={status === options}>
                    {options}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="is Admin"
                checked={isAdmin}
                onChange={handleChange("isAdmin")}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
