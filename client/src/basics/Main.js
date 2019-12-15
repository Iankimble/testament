import React, { Component } from "react";
import { Jumbotron, Container, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Main = () => (
  <div>
    <Jumbotron fluid style={{ height: "70vh" }}>
      <Container>
        <h1 style={{ textAlign: "center" }}>Welcome to Testament</h1>
        <p style={{ textAlign: "center" }}>brief blurb about the page</p>
      </Container>
    </Jumbotron>

    <Container>
      <Row>
        <Col
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <div style={{ margin: "auto", width: "300px", marginTop: "1px" }}>
            <Link to="/signup">
              <Button
                variant="primary"
                style={{ margin: "auto", width: "300px", marginTop: "1px" }}
              >
                Sign up
              </Button>
            </Link>
          </div>
        </Col>

        <Col
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <div style={{ margin: "auto", width: "300px", marginTop: "1px" }}>
            <Link to="/signin">
              <Button
                variant="primary"
                style={{ margin: "auto", width: "300px", marginTop: "1px" }}
              >
                Sign up
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Main;
