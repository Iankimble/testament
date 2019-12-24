import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
// import { Redirect, Link } from "react-router-dom";
import { read } from "./User-Api";
import SubProfileMenu from "./SubProfileMenu";
import { allPrayers } from "../prayers/prayer-api";
import { Jumbotron } from "react-bootstrap";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
      error: "",
      prayers: [],
      dailyBread: [],
      isLoaded: false,
      last: {},
      lastId: ""
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
    allPrayers(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ prayers: data });
      }
      const prayerArray = this.state.prayers;
      // console.log(prayerArray);
      const last = prayerArray[prayerArray.length - 1];

      console.log(last);
      this.setState({ last: last });
      let lastId = last._id._id;
      console.log(last._id._id);
      this.setState({ lastId: lastId });
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
    // console.log(this.props.match.params.userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { prayers, last, lastId } = this.state;

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
            <SubProfileMenu prayers={prayers} last={last} lastId={lastId} />
          </p>
        </div>
      </div>
    );
  }
}
export default Profile;
