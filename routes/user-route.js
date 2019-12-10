const express = require("express");

const {} = require();

const router = express.Router();

// get account
router.get("/user/:userId");

// delete account
router.delete("/user/:userId");

router.param("userId", userById);

module.exports = router;
