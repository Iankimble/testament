import React, { Component } from "react";
import { single, remove } from "./prayer-api";
import { isAuthenticated } from "../auth/Index";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import PrayerNote from "./PrayerNotes";
import {
  Jumbotron,
  Button,
  ToggleButton,
  ButtonGroup,
  Container,
  Row,
  Col,
  ButtonToolbar
} from "react-bootstrap";
import Profile from "../user/Profile";

class SinglePrayer extends Component {
  state = {
    prayer: "",
    userId: "",
    redirectToHome: false,
    notes: [],
    error: "",
    prayerId: ""
  };

  componentDidMount = () => {
    const prayerId = this.props.match.params.prayerId;
    single(prayerId).then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.setState({
          prayer: data,
          notes: data.notes,
          prayerId: data._id
        });
      }
      console.log(this.state.prayer);
      console.log(this.state.notes);
      console.log(this.state.prayerId);
    });
  };

  updateNotes = notes => {
    this.setState({ notes });
    console.log({ notes });
  };

  deletePrayer = () => {
    const userId = isAuthenticated().user._id;
    const prayerId = this.props.match.params.prayerId;
    const token = isAuthenticated().token;
    this.setState({
      userId: userId
    });
    console.log(this.state.userId);
    remove(prayerId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({});
        alert("prayer deleted");
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this prayer?");
    if (answer) {
      this.deletePrayer();
    }
  };

  render() {
    const { prayer, redirectToHome, userId, notes, prayerId } = this.state;
    if (redirectToHome) {
      return <Redirect to={`user/${userId}`} />;
    }
    return (
      <div>
        <Container>
          <Jumbotron style={{ textAlign: "center", marginTop: "15px" }}>
            <h1>{this.state.prayer.title}</h1>
            <p>
              <i>
                {" "}
                {moment(new Date(this.state.prayer.createdOn)).format(
                  "MMMM Do YYYY, h:mm a"
                )}
              </i>
              {/* <i> {new Date(this.state.prayer.createdOn).toString()}</i> */}
            </p>
            <p>{this.state.prayer.body}</p>
          </Jumbotron>
          <div
            style={{
              textAlign: "center",
              alignContent: "center",
              margin: "5px"
            }}
          >
            <Row
              style={{
                alignContent: "center",
                textAlign: "center",
                justifyContent: "center"
              }}
            >
              <ButtonToolbar>
                <Link to={`/prayer/edit/${this.state.prayer._id}`}>
                  <Button
                    variant="primary"
                    style={{
                      margin: "5px",
                      width: "35vw",
                      alignContent: "center",
                      textAlign: "center",
                      justifyContent: "center"
                    }}
                  >
                    Edit prayer
                  </Button>
                </Link>

                <Link>
                  <Button
                    variant="danger"
                    style={{
                      margin: "5px",
                      width: "35vw",
                      alignContent: "center",
                      textAlign: "center",
                      justifyContent: "center"
                    }}
                    onClick={this.deleteConfirmed}
                  >
                    Delete prayer
                  </Button>
                </Link>
              </ButtonToolbar>
            </Row>
          </div>
        </Container>

        <div>
          <PrayerNote
            prayerId={prayerId}
            notes={notes}
            updateNotes={this.updateNotes}
          />
        </div>
      </div>
    );
  }
}

export default SinglePrayer;
