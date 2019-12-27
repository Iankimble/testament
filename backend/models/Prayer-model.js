const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Model to make a prayer for a person/people

const prayer = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  postedBy: {
    type: ObjectId,
    ref: "User"
  },
  notes: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: ObjectId, ref: "User" }
    }
  ],

  updated: Date
});

module.exports = mongoose.model("prayer", prayer);
