import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardGroup, Button } from "react-bootstrap";

class SubProfileMenu extends Component {
  render() {
    const { prayers, last } = this.props;
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
          </Card>

          {/**prayers for others */}
          <Card>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                current most recent prayer title
              </Card.Title>
              <Card.Text style={{ textAlign: "center", fontSize: "75px" }}>
                <p>
                  <h2>{last.title}</h2>
                  <h5>{last.body}</h5>
                </p>
              </Card.Text>
            </Card.Body>
            <div>
              <Button size="lg" block>
                <Link to={``} />
                View Prayer
              </Button>
            </div>
          </Card>
        </CardGroup>
      </div>
    );
  }
}
export default SubProfileMenu;
