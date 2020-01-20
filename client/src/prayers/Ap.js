import React, { Component } from "react";
import { allPg } from "./prayer-api";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/Index";
import {
  Card,
  Button,
  CardGroup,
  CardDeck,
  CardColumns,
  Row
} from "react-bootstrap";

class Ap extends Component {
  constructor() {
    super();
    this.state = {
      prayers: [],
      page: 1,
      limit: 3,
      userId: isAuthenticated().user_id,
      token: isAuthenticated().token
    };
  }

  getData = () => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const limit = this.state.limit;
    const page = this.state.page;
    allPg(userId, token, page, limit).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ prayers: data });
      }
      // console.log(this.state.prayers);
      console.log(this.state.page);
      let pgDataObj = this.state.prayers.reverse();

      console.log(pgDataObj);
    });
  };

  loadNext = () => {
    this.setState({ page: this.state.page + 1 });
    this.getData();
    console.log("next");
    console.log(this.state.page);
  };

  loadPrev = () => {
    this.setState({ page: this.state.page - 1 });
    this.getData();
    console.log("previous");
    console.log(this.state.page);
  };

  componentDidMount() {
    this.getData(this.state.page);
  }

  renderPrayers = prayers => {
    return (
      <div style={{ margin: "10px", fontFamily: "IBM Plex Serif" }}>
        <br />
        {prayers.map((prayers, i) => {
          return (
            <div key={i}>
              <div
                style={{
                  alignContent: "center",
                  textAlign: "center",
                  justifyContent: "center"
                }}
              >
                <CardGroup
                  style={{
                    margin: "0px auto",
                    float: "none",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{prayers.title}</Card.Title>
                      <hr />
                      <Card.Text>
                        <p
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "5px"
                          }}
                        >
                          {prayers.body}
                        </p>
                        <br />
                      </Card.Text>
                      <Link to={`/prayer/${prayers._id._id}`}>
                        <Button
                          style={{
                            backgroundColor: "#6e6e6dff",
                            border: "none"
                          }}
                        >
                          View more
                        </Button>
                      </Link>
                    </Card.Body>
                    <Card.Footer>
                      Created on {new Date(prayers.createdOn).toDateString()}
                    </Card.Footer>
                  </Card>
                </CardGroup>
                <br />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { prayers } = this.state;
    return (
      <div style={{ margin: "10px" }}>
        <h2 style={{ textAlign: "center" }}>All Prayers</h2>

        {this.renderPrayers(prayers)}
        <div
          style={{
            alignContent: "center",
            textAlign: "center",
            justifyContent: "center"
          }}
        >
          <Button
            size="lg"
            style={{
              width: "200px",
              margin: "5px",
              backgroundColor: "#6e6e6dff",
              border: "none"
            }}
            onClick={this.loadPrev}
          >
            Previous
          </Button>
          <Button
            size="lg"
            style={{
              width: "200px",
              margin: "5px",
              backgroundColor: "#6e6e6dff",
              border: "none"
            }}
            onClick={this.loadNext}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default Ap;
