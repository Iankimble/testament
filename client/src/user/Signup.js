import React, { Component } from "react";
import { signup } from "../auth/Index";
import { Link } from "react-router-dom";
import { Jumbotron, Form, Col, Button } from "react-bootstrap";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const user = {
      firstName,
      lastName,
      email,
      password
    };

    signup(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          open: true
        });
    });
  };

  signupForm = (firstName, lastName, email, password) => (
    <div>
      <h1>Sign Up</h1>
      <br />
      <form style={{ fontFamily: "IBM Plex Serif" }}>
        <Form>
          <Form.Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="First name"
                type="text"
                onChange={this.handleChange("firstName")}
                value={firstName}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last name"
                type="text"
                onChange={this.handleChange("lastName")}
                value={lastName}
              />
            </Col>
          </Form.Row>

          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChange("email")}
              value={email}
            />
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              onChange={this.handleChange("password")}
              value={password}
            />
          </Form.Group>
        </Form>

        <Button
          onClick={this.clickSubmit}
          style={{ backgroundColor: "#6e6e6dff", border: "none" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );

  render() {
    const { firstName, lastName, email, password, error, open } = this.state;
    return (
      <div>
        <Jumbotron style={{ height: "90vh" }}>
          <div style={{ display: error ? "" : "none" }}>{error}</div>

          <div style={{ display: open ? "" : "none" }}>
            Account successfully created!
            <Link to="/signin"> Sign in</Link>
          </div>
          <br />
          {this.signupForm(firstName, lastName, email, password)}
        </Jumbotron>
      </div>
    );
  }
}

export default Signup;
