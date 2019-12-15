import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
import { Redirect, Link } from "react-router-dom";
import { read } from "./User-Api";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
      error: "",
      pm: [],
      dailyBread: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.userId);
  }

  // componentDidMount() {
  //   // const userId = this.props.match.params.userId;
  //   // this.init(userId);
  //   console.log(this.props.match.params.userId);
  // }

  render() {
    return (
      <div>
        <h2>Welcome, {isAuthenticated().user.firstName}</h2>
      </div>
    );
  }
}
export default Profile;
