const express = require("express");
const { signup, signin, signout } = require();
const { userById } = require();
const { userSignupValidation } = require();

const router = express.Router();

//Signup
router.post("/signup", userSignupValidation, signup);

//Signin
router.post("/signin"), signin;

//Signout
router.get("/signout", signout);

router.param("userId", userById);

module.exports = router;
