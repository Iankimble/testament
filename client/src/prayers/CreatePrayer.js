import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
import { createPrayer } from "./prayer-api";
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
            body: ""
          });
        }
        alert("prayer created!");
      });
    }
  };

  newPrayerForm = (title, body) => (
    <div style={{ margin: "10px", fontFamily: "IBM Plex Serif" }}>
      <h2 style={{ textAlign: "center" }}> Create a prayer</h2>
      <hr />
      <form>
        <Form.Row>
          <Col>
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Please give your prayer a title"
              type="text"
              onChange={this.handleChange("title")}
              value={title}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Label>Prayer</Form.Label>
            <Form.Control
              style={{ height: "300px" }}
              as="textarea"
              placeholder={` Type your prayer here. Whether it's concerning a certain issue in your life or someone elses, reflection on scripture, or giving the LORD thanks and praise.`}
              type="text"
              onChange={this.handleChange("body")}
              value={body}
            />
          </Col>
        </Form.Row>
      </form>
      <br />
      <Button
        size="lg"
        block
        onClick={this.clickSubmit}
        style={{
          backgroundColor: "#6e6e6dff",
          border: "none",
          fontFamily: "IBM Plex Serif"
        }}
      >
        Create Prayer
      </Button>
    </div>
  );

  render() {
    const { title, body } = this.state;
    return <div>{this.newPrayerForm(title, body)}</div>;
  }
}
export default CreatePrayer;
