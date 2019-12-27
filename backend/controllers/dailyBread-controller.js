const Scripture = require("../models/DailyBread-model");
const Daily = require("../models/Daily");

exports.createPassage = (req, res) => {
  let passage = new Scripture(req.body);
  passage.save((err, result) => {
    if (err) {
      res
        .status(400)
        .json({ msg: "somethings wrong check createPassage -Ian" });
    }
    res.status(200).json(result);
  });
};

// move this to server so it can work with scheduler
exports.dailyBread = (req, res) => {
  Daily.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({ msg: "nah" });
    }
    res.json(data);
  });
};
