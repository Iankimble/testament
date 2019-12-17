import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardGroup, Button } from "react-bootstrap";

class SubProfileMenu extends Component {
  render() {
    const { pm } = this.props;
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
                {pm.length}
              </Card.Text>
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
            </Card.Body>
            <Card.Footer style={{ textAlign: "center" }}>
              <small>Last updated...</small>
            </Card.Footer>
          </Card>

          {/**prayers for others */}
          <Card>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                Prayers for others
              </Card.Title>
              <Card.Text style={{ textAlign: "center", fontSize: "75px" }}>
                0
              </Card.Text>
              <div>
                <Button size="lg" block>
                  View all prayers
                </Button>
                <Button size="lg" block>
                  Create new prayer
                </Button>
              </div>
            </Card.Body>
            <Card.Footer style={{ textAlign: "center" }}>
              <small>Last updated... </small>
            </Card.Footer>
          </Card>

          {/** thanks and praise */}
          <Card>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                Thanks and praise
              </Card.Title>
              <Card.Text style={{ textAlign: "center", fontSize: "75px" }}>
                0
              </Card.Text>
              <div>
                <Button size="lg" block>
                  View all prayers
                </Button>
                <Button size="lg" block>
                  Create new prayer
                </Button>
              </div>
            </Card.Body>
            <Card.Footer style={{ textAlign: "center" }}>
              <small>Last updated...</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    );
  }
}
export default SubProfileMenu;
