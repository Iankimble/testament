const MainPrayer = require("../models/PrayMain-model");
const _ = require("lodash");

// Pm id (Finding a prayer by ID)
exports.pmById = (req, res, next, id) => {
  MainPrayer.findById(id)
    .populate("createdBy", "_id")
    .select("_id prayerTitle body createdOn")
    .exec((err, data) => {
      if (err || !data) {
        return res.status(400).json({
          msg: "error -Ian"
        });
      }
      req.data = data;
      next();
    });
};

// All Pm by users
exports.allUserPm = (req, res) => {
  MainPrayer.find({ createdBy: req.profile._id })
    .populate("createdBy", "_id firstName")
    .select("_id prayerTitle body createOn")
    .sort("createdOn")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(data);
    });
};

// Create a new prayer
exports.createPm = (req, res) => {
  let newPm = new MainPrayer(req.body);
  newPm.createdBy = req.profile;
  newPm.save(err => {
    if (err) {
      return res.status(400).json({
        msg: "something went wrong pm not saved.  -Ian"
      });
    }
    res.json({ msg: "pm saved. Amen. -Ian" });
  });
};

// get a single pm created by user based on pmId
exports.singlePm = (req, res) => {
  return res.json(req.data);
};

// Confirming user is authorized to make actions
exports.userConfirmed = (req, res, next) => {
  let user = req.data && req.auth && req.pm.createdBy._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "User is not authorized -Ian"
    });
  }
  next();
};
