const express = require("express");
const { dailyBread } = require("../controllers/dailyBread-controller");

const router = express.Router();

router.get("/dailyBread", dailyBread);

module.exports = router;
