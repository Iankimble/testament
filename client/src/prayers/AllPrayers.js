import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
import { allPrayers, list } from "./prayer-api";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardGroup,
  CardDeck,
  CardColumns,
  Row
} from "react-bootstrap";

class AllPrayers extends Component {
  constructor() {
    super();
    this.state = {
      prayers: [],
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
      // console.log(this.state.prayers);
      let prayArray = this.state.prayers.reverse();
      // console.log(prayArray)
      //
      //
      //
      //
      //
      //
      for (let i = 0; i < prayArray.length; i += 3) {
        console.log(prayArray[i]);
      }
    });
  }

  renderPrayers = prayers => {
    return (
      <div>
        <br />
        {prayers.reverse().map((prayers, i) => {
          return (
            <div key={i}>
              <div
                style={{
                  alignContent: "center",
                  textAlign: "center",
                  justifyContent: "center"
                }}
              >
                <CardGroup>
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
                        <Button>View more</Button>
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

    return <div>{this.renderPrayers(prayers)}</div>;
  }
}
export default AllPrayers;
