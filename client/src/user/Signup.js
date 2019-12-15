import React, { Component } from "react";
import { signup } from "../auth/Index";
import { Link } from "react-router-dom";

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
    <form>
      <div>
        <label>First Name </label>
        <input
          onChange={this.handleChange("firstName")}
          type="text"
          value={firstName}
        ></input>
        <div></div>

        <div>
          <label>Last Name </label>
          <input
            onChange={this.handleChange("lastName")}
            type="text"
            value={lastName}
          ></input>
        </div>

        <label>Email </label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          value={email}
        ></input>
      </div>

      <div>
        <label>Password </label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          value={password}
        ></input>
      </div>

      <button onClick={this.clickSubmit}>Submit</button>
    </form>
  );

  render() {
    const { firstName, lastName, email, password, error, open } = this.state;
    return (
      <div>
        <h1>Sign up</h1>

        <div style={{ display: error ? "" : "none" }}>{error}</div>

        <div style={{ display: open ? "" : "none" }}>
          Account successfully created!
          <Link to="/signin"> Sign in</Link>
        </div>
        {this.signupForm(firstName, lastName, email, password)}
      </div>
    );
  }
}

export default Signup;
