import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
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

  init = prayerId => {
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
    <form>
      <div>
        <label>Post Photo</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div>
        <label>Title</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          value={title}
        />
      </div>

      <div className="form-group">
        <label>Body</label>
        <textarea
          onChange={this.handleChange("body")}
          type="text"
          value={body}
        />
      </div>

      <button onClick={this.clickSubmit}>Update Prayer</button>
    </form>
  );

  render() {
    const { id, title, body, error } = this.state;

    return (
      <div>
        <h2>{title}</h2>

        {isAuthenticated().user._id === id && this.editPrayerForm(title, body)}
      </div>
    );
  }
}

export default EditPrayer;
