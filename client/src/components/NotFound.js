import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const NotFound = () => {
  return (
    <Card.Body className="text-center">
        <Card.Title as="h2">
          <span style={{ color: "red" }}>404! </span> Page Not Found
        </Card.Title>
        <Card.Text as="p">
          Please return to{" "}
          <Link style={{ color: "blue", fontWeight: "bold" }} to="/">
            Home
          </Link>
        </Card.Text>
      </Card.Body>
  );
};

export default NotFound;
