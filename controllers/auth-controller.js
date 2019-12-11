const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const _ = require("lodash");

const User = require("../models/User-model");

// Checks if there is a user, does call back to check if error, then creates user
// and saves to DB.

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      error: "Email already exists. -Ian"
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "sign up success. Go to login -Ian" });
};

// Finds user by email, does callback and checks for error or if there is no user
// Then checks if the email matches with authenticate, if the user is found
// creates a token and persists token with cookie

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist. Signup first. -Ian"
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "email and password dont match up. -Ian"
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("tkn", token, { expire: new Date() + 9999 });
    const { _id, firstName, lastName, email } = user;
    return res.json({ token, user: { _id, email, firstName, lastName } });
  });
};

// Clears the cookie/token session and logs out user
exports.signout = (req, res) => {
  res.clearCookie("tkn");
  return res.json({ message: "user is signed out. -Ian" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
