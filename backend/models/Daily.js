const mongoose = require("mongoose");

const daily = new mongoose.Schema({
  book: {
    type: String
  },
  chapter: {
    type: String
  },
  verseStart: {
    type: Number
  },
  verseEnd: {
    type: Number
  },
  text: {
    type: String
  },
  setOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("daily", daily);
