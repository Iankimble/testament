import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardGroup, Button, Col, Row } from "react-bootstrap";
import { isAuthenticated } from "../auth/Index";

class NoDataSub extends Component {
  render() {
    const { prayers, last, lastId } = this.props;
    return (
      <div>
        <CardGroup style={{ margin: "5px" }}>
          {/** main prayers */}
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
                <i>Prayer entry count</i>
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
                <Link to={`/all/prayers/${isAuthenticated().user._id}`}>
                  <Button size="lg" style={{ width: "300px" }}>
                    View all prayers
                  </Button>
                </Link>
              </div>
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
          <Card>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                <i>Most recently created prayer</i>
                <hr />
              </Card.Title>
              <Card.Text
                style={{
                  textAlign: "center"
                }}
              >
                <p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "20px",
                      padding: "45px"
                    }}
                  ></p>
                </p>
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
              ></div>
            </Row>
          </Card>
        </CardGroup>
      </div>
    );
  }
}
export default NoDataSub;
