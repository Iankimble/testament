const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  hash_password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },

  updated: Date
});

module.exports = mongoose.model("User", userSchema);
