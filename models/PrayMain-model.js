const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

// Model to make a prayer for a person/people

const prayMainSchema = new mongoose.Schema({
  prayerTitle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  updated: Date
});

module.exports = mongoose.model("PrayFor", prayMainSchema);

// Append logic
// quote bible logic
// close prayer, prayer answered
// comment logic for adding/ apending update
