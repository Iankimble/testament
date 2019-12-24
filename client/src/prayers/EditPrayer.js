import React, { Component } from "react";
import { Button, Card, Form, Col } from "react-bootstrap";
import { isAuthenticated } from "../auth/Index";
import { single, update } from "./prayer-api";

class EditPrayer extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      error: "",
      fileSize: 0,
      loading: false
    };
  }

  init = () => {
    const prayerId = this.props.match.params.prayerId;
    single(prayerId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          id: data.postedBy._id,
          title: data.title,
          body: data.body,
          error: ""
        });
      }
    });
  };

  componentDidMount() {
    this.postData = new FormData();
    const prayerId = this.props.match.params.prayertId;
    this.init(prayerId);
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 1000000) {
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
      const prayerId = this.props.match.params.prayerId;
      const token = isAuthenticated().token;

      update(prayerId, token, this.postData).then(data => {
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

  editPrayerForm = (title, body) => (
    <div style={{ margin: "10px" }}>
      <h2 style={{ textAlign: "center" }}> Edit prayer</h2>
      <Form>
        <Form.Row>
          <Col>
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={this.handleChange("title")}
              type="text"
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
              onChange={this.handleChange("body")}
              type="text"
              value={body}
            />
          </Col>
        </Form.Row>

        <Button size="lg" block onClick={this.clickSubmit}>
          Update Prayer
        </Button>
      </Form>
    </div>
  );

  render() {
    const { id, title, body, error } = this.state;

    return (
      <div>
        <h2></h2>

        {isAuthenticated().user._id === id && this.editPrayerForm(title, body)}
      </div>
    );
  }
}

export default EditPrayer;
