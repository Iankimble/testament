import React, { Component } from "react";
import { SinglePrayer, singlePrayer } from "./prayer-api";
import { isAuthenticated } from "../auth/Index";

class SinglePrayer extends Component {
  constructor() {
    super();
    this.state = {
      prayer: "",
      error: ""
    };
  }

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePrayer(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          prayer: data
        });
      }
    });
  };

  renderPrayer = prayer => {
    return (
      <div>
        <h2>{prayer.title}</h2>
        <p>{prayer.body}</p>
      </div>
    );
  };

  render() {
    const { prayer } = this.state;
    return <div>{this.renderPrayer(prayer)}</div>;
  }
}
