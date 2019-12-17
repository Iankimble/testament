import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
import { read, allUserPm } from "./prayer-api";
import { Links } from "react-router-dom";
import { json } from "express/lib/express";

class AllPmPrayers extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      pmPrayers: []
    };
  }

  // componentDidMount() {
  //   const userId = this.props.match.params.userId;
  //   this.init(userId);
  //   console.log(this.props.match.params.userId);
  // }

  render() {
    return (
      <div>
        <h2>All primary</h2>
      </div>
    );
  }
}

export default AllPmPrayers;
