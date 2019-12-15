import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/Index.js";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectTo: false,
      loading: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    console.log(user);

    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          this.setState({ redirectTo: true });
        });
      }
    });
  };

  signinForm = (email, password) => (
    <form>
      <div>
        <label>Email </label>
        <input
          onChange={this.handleChange("email")}
          type="text"
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
    const { email, password, error, redirectTo, loading } = this.state;
    if (redirectTo) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }

    return (
      <div>
        <h1>Sign In</h1>

        <div style={{ display: error ? "" : "none" }}>{error}</div>

        {loading ? (
          <div>
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
        {this.signinForm(email, password)}
      </div>
    );
  }
}

export default Signin;
