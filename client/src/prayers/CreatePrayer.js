import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
import { createPrayer } from "./prayer-api";
import { Redirect } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";

class CreatePrayer extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      createPrayer(userId, token, this.postData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            redirectToProfile: true
          });
        }
      });
    }
  };

  newPrayerForm = (title, body) => (
    <div>
      <form>
        <Form.Row>
          <Col>
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Title"
              type="text"
              onChange={this.handleChange("title")}
              value={title}
            />
          </Col>
          <Col>
            <Form.Label>Prayer</Form.Label>
            <Form.Control
              placeholder=" Prayer"
              type="text"
              onChange={this.handleChange("body")}
              value={body}
            />
          </Col>
        </Form.Row>
      </form>

      <Button onClick={this.clickSubmit}>Create Prayer</Button>
    </div>
  );

  render() {
    const { title, body } = this.state;
    return <div>{this.newPrayerForm(title, body)}</div>;
  }
}
export default CreatePrayer;
