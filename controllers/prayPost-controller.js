const PrayMain = require("../models/PrayFor-model");
const PrayFor = require("../models/PrayFor-model");
const PrayThanks = require("../models/PrayThanks-model");

const fs = require("fs");
const _ = require("lodash");

/////////////////////////////////////// Find prayers by ID
exports.pmById = (req, res, next, id) => {
  PrayMain.findById(id)
    .populate("prayerBy", "_id name")
    .exec((err, data) => {
      if (err || !data) {
        return res.status(400).json({ error: err });
      }
      req.prayer = prayer;
      next();
    });
};

exports.pfById = (req, res, next, id) => {
  PrayFor.findById(id)
    .populate("prayerBy", "_id name")
    .exec((err, data) => {
      if (err || !data) {
        return res.status(400).json({ error: err });
      }
      req.prayer = prayer;
      next();
    });
};

exports.tyById = (req, res, next, id) => {
  PrayThanks.findById(id)
    .populate("prayerBy", "_id name")
    .exec((err, data) => {
      if (err || !data) {
        return res.status(400).json({ error: err });
      }
      req.prayer = prayer;
      next();
    });
};

///////////////////// GET all prayers by model and by ID
exports.getPm = (req, res) => {
  const prayer = PrayMain.find()
    .populate("prayerBy", "_id name")
    .select("_id prayerTitle body")
    .then(prayers => {
      res
        .status(200)
        .json({ prayers })
        .catch(err => console.log(err));
    });
};

exports.getPf = (req, res) => {
  const prayer = PrayFor.find()
    .populate("prayerBy", "_id name")
    .select("_id prayerTitle body")
    .then(prayers => {
      res
        .status(200)
        .json({ prayers })
        .catch(err => console.log(err));
    });
};

exports.getTy = (req, res) => {
  const prayer = prayer
    .find()
    .populate("prayerBy", "_id name")
    .select("_id prayerTitle body")
    .then(prayers => {
      res
        .status(200)
        .json({ prayers })
        .catch(err => console.log(err));
    });
};

////////////////////////////// Create a prayer by Model type
exports.createPm = (req, res, next) => {
  let newPm = new PrayMain(req.body);
  newPm.save(err => {
    if (err) {
      return res.status(400).json({
        msg: "something went wrong pm not saved.  -Ian"
      });
    }
    res.json({ msg: "pm saved. Amen. -Ian" });
  });
};

exports.createPf = (req, res, next) => {
  let newPf = new PrayFor(req.body);
  newPf.save(err => {
    if (err) {
      return res.status(400).json({
        msg: "something went wrong pm not saved.  -Ian"
      });
    }
    res.json({ msg: "pf saved. Amen. -Ian" });
  });
};

exports.createTy = (req, res, next) => {
  let newTy = new PrayThanks(req.body);
  newTy.save(err => {
    if (err) {
      return res.status(400).json({
        msg: "something went wrong pm not saved.  -Ian"
      });
    }
    res.json({ msg: "ty saved. Amen. -Ian" });
  });
};

//////
exports.prayerByUser = (req, res) => {
  Prayer.find({ prayerBy: req.profile._id })
    .populate("prayerBy", "_id name")
    .sort("_created")
    .exec((err, prayers) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(prayers);
    });
};

exports.isprayerer = (req, res, next) => {
  let isUser =
    req.prayer && req.auth && req.prayer.prayeredBy._id == req.auth._id;
  if (!isUser) {
    return res.status(403).json({
      error: "User not authorized."
    });
  }
  next();
};

exports.editPrayer = (req, res, next) => {
  let prayer = req.prayers;
  prayer = _.extend(prayer, req.body);
  prayer.updated = Date.now();
  prayer.save(err => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(prayer);
  });
};

// Comment logic //

exports.deletePrayer = (req, res) => {
  let prayer = req.prayer;
  prayer.remove((err, prayer) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ message: "prayer has been deleted successfully." });
  });
};
