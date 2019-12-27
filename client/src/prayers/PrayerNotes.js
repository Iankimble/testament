import React, { Component } from "react";
import { addNote, removeNote } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

class PrayerNote extends Component {
  state = {
    text: "",
    error: ""
  };

  handleChange = event => {
    this.setState({ error: "" });
    this.setState({ text: event.target.value });
  };

  note = e => {
    e.preventDefault();

    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    addNote(userId, token, postId, { text: this.state.text }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ text: "" });
        // dispatch fresh list of coments to parent (SinglePost)
        this.props.updateNote(data.notes);
      }
    });
  };

  removeNote = note => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    removeNote(userId, token, postId, note).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateNote(data.notes);
      }
    });
  };

  deleteConfirmed = comment => {
    let answer = window.confirm("Are you sure you want to delete your note?");
    if (answer) {
      this.deleteComment(note);
    }
  };

  render() {
    const { notes } = this.props;
    const { error } = this.state;

    return (
      <div>
        <h2 className="mt-5 mb-5">Leave a comment</h2>

        <form onSubmit={this.addNote}>
          <div className="form-group">
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.text}
              className="form-control"
              placeholder="Leave a comment..."
            />
            <button className="btn btn-raised btn-success mt-2">Append</button>
          </div>
        </form>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div className="col-md-12">
          <h3 className="text-primary">{notes.length} Comments</h3>
          <hr />
          {notes.map((note, i) => (
            <div key={i}>
              <div>
                <Link to={`/user/${note.postedBy._id}`}>
                  <img
                    style={{
                      borderRadius: "50%",
                      border: "1px solid black"
                    }}
                    className="float-left mr-2"
                    height="30px"
                    width="30px"
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${note.postedBy._id}`}
                  />
                </Link>
                <div>
                  <p className="lead">{note.text}</p>
                  <p className="font-italic mark">
                    Posted by{" "}
                    <Link to={`/user/${note.postedBy._id}`}>
                      {note.postedBy.name}{" "}
                    </Link>
                    on {new Date(note.created).toDateString()}
                    <span>
                      {isAuthenticated().user &&
                        isAuthenticated().user._id === note.postedBy._id && (
                          <>
                            <span
                              onClick={() => this.deleteConfirmed(note)}
                              className="text-danger float-right mr-1"
                            >
                              Remove
                            </span>
                          </>
                        )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PrayerNote;
