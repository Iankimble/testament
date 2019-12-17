import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
import { createPm } from "./prayer-api";
import { Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

class CreatePm extends Component {
  constructor() {
    super();
    this.state = {
      prayerTitle: "",
      body: "",
      error: "",
      fileSize: 0,
      user: {}
    };
  }

  componentDidMount() {
    // this.pmData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  // isValid = () => {
  //   const { prayerTitle, body, fileSize } = this.state;
  //   if (fileSize > 100000) {
  //     this.setState({
  //       error: "File size should be less than 100kb",
  //       loading: false
  //     });
  //     return false;
  //   }
  //   if (prayerTitle.length === 0 || body.length === 0) {
  //     this.setState({ error: "All fields are required", loading: false });
  //     return false;
  //   }
  //   return true;
  // };

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });

    // const value = name === "photo" ? event.target.files[0] : event.target.value;
    // const value = event.target.value;
    // this.pmData.set(name, value);
    // this.setState({ [name]: value });
    // console.log(this.state.prayerTitle);
  };

  clickSubmit = event => {
    event.preventDefault();
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    createPm(userId, token).then(data => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          prayerTitle: "",
          body: ""
        });
      }
      console.log("new prayer", data);
    });
    console.log(userId);
    console.log(token);
    console.log(this.pmData);
    console.log(this.state.prayerTitle);
  };

  newPmForm = (prayerTitle, body) => (
    <div>
      <br />
      <Form>
        <Form.Label>Prayer title</Form.Label>
        <Form.Control
          type="text"
          onChange={this.handleChange("prayerTitle")}
          value={prayerTitle}
        />

        <Form.Label>Prayer</Form.Label>
        <Form.Control
          type="text"
          onChange={this.handleChange("body")}
          value={body}
        />

        <Button onClick={this.clickSubmit}>Submit</Button>
      </Form>
    </div>
  );

  render() {
    const { prayerTitle, body } = this.state;
    return <div>{this.newPmForm(prayerTitle, body)}</div>;
  }
}
export default CreatePm;
