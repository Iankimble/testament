import React, { Component } from "react";
import { single } from "./prayer-api";

class SinglePrayer extends Component {
  state = {
    prayer: ""
  };

  componentDidMount = () => {
    const prayerId = this.props.match.params.prayerId;
    single(prayerId).then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.setState({ prayer: data });
      }
      console.log(this.state.prayer);
    });
  };

  render() {
    return <div>{this.props.match.params.prayerId}</div>;
  }
}

export default SinglePrayer;
