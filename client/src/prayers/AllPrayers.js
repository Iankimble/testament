import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
import { allPrayers } from "./prayer-api";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

class AllPrayers extends Component {
  constructor() {
    super();
    this.state = {
      prayers: [],
      page: 1,
      error: ""
    };
  }
  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    allPrayers(userId, token).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ prayers: data });
      }
      console.log(this.state.prayers);
      let prayArray = this.state.prayers.reverse();
      console.log(prayArray);
    });
  }

  renderPrayers = prayers => {
    return (
      <div>
        <br />
        {prayers.reverse().map((prayer, i) => {
          const userId = prayer.createdBy;
          return (
            <div key={i}>
              <div>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{prayer.title}</Card.Title>
                    <Card.Text>{prayer.body}</Card.Text>
                    <Link to={`/prayer/${prayer._id}`}>
                      <Button>View prayer</Button>
                    </Link>
                  </Card.Body>
                  <Card.Footer>
                    Created on {new Date(prayer.createdOn).toDateString()}
                  </Card.Footer>
                </Card>
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
    return <div>{this.renderPrayers(prayers)}</div>;
  }
}
export default AllPrayers;
