const express = require("express");

const { signup, signin, signout } = require("../controllers/auth-controller");
const { userById } = require("../controllers/user-controller");
const { userSignupValidator } = require("../validator/index");

const router = express.Router();

//Signup
router.post("/signup", userSignupValidator, signup);
//Signin
router.post("/signin", signin);
//Signout
router.get("/signout", signout);

router.param("userId", userById);

module.exports = router;
