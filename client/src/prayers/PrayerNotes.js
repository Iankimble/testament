import React, { Component } from "react";
import { addNote, removeNote } from "./prayer-api";
import { isAuthenticated } from "../auth/Index";
import { Link } from "react-router-dom";
import { Form, Col, Button, Row } from "react-bootstrap";

class PrayerNote extends Component {
  state = {
    text: "",
    error: ""
  };

  handleChange = event => {
    this.setState({ error: "" });
    this.setState({ text: event.target.value });
  };

  add = event => {
    event.preventDefault();
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const prayerId = this.props.prayerId;

    addNote(userId, token, prayerId, { text: this.state.text }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ text: "" });
        this.props.updateNotes(data.notes);
      }
    });
  };

  remove = note => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const prayerId = this.props.prayerId;

    console.log(note);

    removeNote(userId, token, prayerId, note).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateNotes(data.notes);
      }
    });
  };

  // deleteConfirmed = note => {
  //   let answer = window.confirm("Are you sure you want to delete your note?");
  //   if (answer) {
  //     this.remove(note);
  //   }
  // };

  render() {
    const { notes } = this.props;
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Leave a note</h2>
        <Form.Row style={{ margin: "10px" }}>
          <Col>
            <Form.Control
              placeholder="Add note"
              as="textarea"
              type="text"
              onChange={this.handleChange}
              value={this.state.text}
            />
          </Col>
        </Form.Row>
        <br />
        <Row style={{ margin: "5px" }}>
          <Button onClick={this.add} variant="info" size="lg" block>
            Add Note
          </Button>
        </Row>
        <br />
        <div style={{ textAlign: "center" }}>
          <h4> Number of notes on prayer : {notes.length} </h4>
          <hr />
          <div>
            {notes.map((note, i) => {
              return (
                <div key={i}>
                  <p>
                    {note.created}
                    <br />
                    {note.text}
                    <br />
                    <Button onClick={() => this.remove(note)}>Remove</Button>
                  </p>
                  <hr />
                </div>
              );
            })}
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default PrayerNote;
