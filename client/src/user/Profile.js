import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
import { read, dailyBread } from "./User-Api";
import SubProfileMenu from "./SubProfileMenu";
import { allPrayers } from "../prayers/prayer-api";
import { Jumbotron, Button, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import dbi from "../images/book-2073023_1920shift.jpg";

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
      } else if (data <= 0) {
        this.setState({
          prayers: 0,
          last: "",
          lastId: ""
        });
      } else {
        this.setState({ prayers: data });
        const prayerArray = this.state.prayers;
        // console.log(prayerArray);
        const last = prayerArray[prayerArray.length - 1];
        this.setState({ last: last });
        let lastId = last._id._id;
        console.log(last);
        console.log(last._id._id);
        this.setState({ lastId: lastId });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);

    //-------------------------------------------------------//
    dailyBread().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          dailyBread: data[0]
        });
        console.log(this.state.dailyBread);
      }
    });
    //-------------------------------------------------------//
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { prayers, last, lastId, dailyBread } = this.state;

    if (!last && !lastId) {
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
            <br />
            <p style={{ textAlign: "center" }}>
              <h5> {dailyBread.text} </h5>
              {dailyBread.book} {dailyBread.chapter}: {dailyBread.verseStart} -
              {dailyBread.verseEnd}
            </p>
          </Jumbotron>
          <br />
          <Card>
            <Card.Body>
              <Card.Title
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  textAlign: "center",
                  justifyContent: "center"
                }}
              >
                <i>Create a prayer</i>
                <hr />
              </Card.Title>
              <Card.Text style={{ textAlign: "center", fontSize: "125px" }}>
                {prayers.length}
              </Card.Text>
            </Card.Body>
            <Row
              style={{
                alignContent: "center",
                textAlign: "center",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  margin: "5px",
                  padding: "5px"
                }}
              >
                <Link to={`/new/prayer/${isAuthenticated().user._id}`}>
                  <Button size="lg" style={{ width: "300px" }}>
                    Create new prayer
                  </Button>
                </Link>
              </div>
            </Row>
          </Card>
        </div>
      );
    }
    {
      return (
        <div>
          <Jumbotron
            fluid
            style={{
              backgroundImage: `url(${dbi})`,
              backgroundSize: "cover",
              color: "white",
              fontFamily: "IBM Plex Serif"
            }}
          >
            <h2 style={{ textAlign: "center" }}>
              Welcome, {isAuthenticated().user.firstName}
              <hr />
              <h3>
                <i>The Daily Bread</i>
              </h3>
            </h2>
            <br />
            <p style={{ textAlign: "center" }}>
              <h5> {dailyBread.text} </h5>
              {dailyBread.book} {dailyBread.chapter}: {dailyBread.verseStart} -
              {dailyBread.verseEnd}
            </p>
          </Jumbotron>

          <div>
            <p>
              <SubProfileMenu prayers={prayers} last={last} lastId={lastId} />
            </p>
          </div>
        </div>
      );
    }
    // }
  }
}
export default Profile;
