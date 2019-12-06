const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const prayThanksSchema = new mongoose.Schema({
  prayThanks: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  updated: Date
});

module.exports = mongoose.model("PrayFor", prayThanksSchema);

// Append logic
// quote bible logic
// close prayer, prayer answered
