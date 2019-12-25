import React, { Component } from "react";
import { allPg } from "./prayer-api";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/Index";

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

  componentDidMount() {
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
      console.log(this.state.prayers);
      console.log(this.state.page);
      let pgDataObj = this.state.prayers;
      console.log(pgDataObj);
    });
  }

  renderPrayers = prayers => {
    return (
      <div>
        {prayers.map((prayer, i) => {
          return (
            <div key={i}>
              <div>
                <h5>{prayer.title}</h5>
                <p>{prayer.body}</p>
                <br />

                <Link>Read more</Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { prayers, page } = this.state;
    return (
      <div>
        <h6>on</h6>

        {/* {this.renderPrayers(prayers)} */}
        <button> prev</button>

        <button> next</button>
      </div>
    );
  }
}

export default Ap;
