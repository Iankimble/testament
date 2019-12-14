const mongoose = require("mongoose");
// const uuidv1 = require("uuid/v1");
// const crypto = require("crypto");

const prayForSchema = new mongoose.Schema({
  prayforName: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  updated: Date
});

module.exports = mongoose.model("prayFor", prayForSchema);

// Append logic
// quote bible logic
// close prayer, prayer answered
// Comment logic for appending adding to prayer
