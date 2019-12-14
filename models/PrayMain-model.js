const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

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
  createdOn: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: ObjectId,
    ref: "User"
  },
  append: [{ msg: String, madeOn: { type: Date, default: Date.now } }],
  updated: Date
});

module.exports = mongoose.model("PrayMain", prayMainSchema);
