const express = require("express");
const {
  dailyBread,
  createPassage
} = require("../controllers/dailyBread-controller");

const router = express.Router();

router.get("/dailybread", dailyBread);

router.post("/dailybread/new", createPassage);

module.exports = router;
