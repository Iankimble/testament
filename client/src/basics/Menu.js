import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/Index";

import { Navbar, Nav } from "react-bootstrap";

const isActive = (history, path) => {
  if (history.location.pathname === path) return {};
  else return {};
};

const Menu = ({ history }) => (
  <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      {!isAuthenticated() && (
        <>
          <Navbar.Brand>
            <Link style={isActive(history, "/")} to="/">
              Testament
            </Link>
          </Navbar.Brand>

          <Nav.Link>
            <Link style={isActive(history, "/signup")} to="/signup">
              Sign up
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link style={isActive(history, "/signin")} to="/signin">
              Sign in
            </Link>
          </Nav.Link>
        </>
      )}

      {isAuthenticated() && (
        <>
          <Navbar.Brand>
            <Link
              to={`/user/${isAuthenticated().user._id}`}
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              className="nav-link"
            >
              {`${isAuthenticated().user.firstName}'s profile`}
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle areia-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav.Link>
              <Link style={isActive(history, "/")}>My prayers</Link>
            </Nav.Link>

            <Nav.Link>
              <Link style={isActive(history, "/")}>Prayers for others</Link>
            </Nav.Link>

            <Nav.Link>
              <Link style={isActive(history, "/")}>Thanks and praise</Link>
            </Nav.Link>

            <Nav>
              <button
                style={isActive(history, "/signout")}
                onClick={() => signout(() => history.push("/"))}
              >
                Sign out
              </button>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  </div>
);

export default withRouter(Menu);
