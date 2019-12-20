import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardGroup, Button } from "react-bootstrap";

class SubProfileMenu extends Component {
  render() {
    const { prayers } = this.props;
    return (
      <div>
        <CardGroup>
          {/** main prayers */}
          <Card>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                Main Prayers
              </Card.Title>
              <Card.Text style={{ textAlign: "center", fontSize: "75px" }}>
                {prayers.length}
              </Card.Text>
            </Card.Body>
            <div style={{ marginBottom: "5px" }}>
              <Link to="all/pm/:userId">
                <Button size="lg" block>
                  View all prayers
                </Button>
              </Link>
            </div>
            <div style={{ marginTop: "5px" }}>
              <Link to="/pm/:pmId">
                <Button size="lg" block>
                  Create new prayer
                </Button>
              </Link>
            </div>
            <Card.Footer style={{ textAlign: "center" }}>
              <small>Last updated...</small>
            </Card.Footer>
          </Card>

          {/**prayers for others */}
          <Card>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                current most recent prayer title
              </Card.Title>
              <Card.Text style={{ textAlign: "center", fontSize: "75px" }}>
                {/* <p> {prayers.map}</p> */}
                {prayers.map((post, i) => (
                  <div key={i}>
                    <div>
                      <Link to={`/post/${post._id}`}>
                        <div>
                          <p className="lead">{post.title}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </Card.Text>
            </Card.Body>
            <div>
              <Button size="lg" block>
                Review Prayer
              </Button>
            </div>
            <Card.Footer style={{ textAlign: "center" }}>
              <small>Last updated... </small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    );
  }
}
export default SubProfileMenu;
