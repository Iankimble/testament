import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
// import { Redirect, Link } from "react-router-dom";
import { read } from "./User-Api";
import SubProfileMenu from "./SubProfileMenu";
import { allUserPm } from "../prayers/prayer-api";
import { Jumbotron } from "react-bootstrap";

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

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
        this.loadData(data._id);
      }
    });
  };

  loadData = userId => {
    const token = isAuthenticated().token;
    allUserPm(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ pm: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
    console.log(this.props.match.params.userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { pm } = this.state;

    return (
      <div>
        <Jumbotron fluid>
          <h2 style={{ textAlign: "center" }}>
            Welcome, {isAuthenticated().user.firstName}
            <hr />
            <h3>
              <i>The Daily Bread</i>
            </h3>
          </h2>
        </Jumbotron>

        <div>
          <p>
            <SubProfileMenu pm={pm} />
          </p>
        </div>
      </div>
    );
  }
}
export default Profile;
