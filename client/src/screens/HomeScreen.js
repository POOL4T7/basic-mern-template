import React from "react";
import { Container } from "react-bootstrap";

const HomeScreen = () => {
  return (
    <Container className="text-center">
      <h1>
        <span style={{ color: "red" }}>R</span>eact{" "}
        <span style={{ color: "red" }}>B</span>oiler{" "}
        <span style={{ color: "red" }}>P</span>late
      </h1>
      <hr />
      <h4>Fully authenticated with..</h4>
      <p>
        <strong>1.</strong> JWT-Token
      </p>
      <p>
        <strong>2.</strong> Google Login
      </p>
      <p>
        <strong>3.</strong> Google reCaptcha for distinguish between human and
        bot
      </p>
    </Container>
  );
};

export default HomeScreen;
