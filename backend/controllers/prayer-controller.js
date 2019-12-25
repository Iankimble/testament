const Prayer = require("../models/Prayer-model");
const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");

exports.prayerById = (req, res, next, id) => {
  Prayer.findById(id)
    .populate("postedBy", "_id")
    .select("_id title body createdOn")
    .exec((err, prayer) => {
      if (err || !prayer) {
        return res.staus(400).json({
          msg: "Cant find prayer. Check allUserPrayer route -Ian"
        });
      }
      req.prayer = prayer;
      next();
    });
};

exports.allUserPrayers = (req, res) => {
  Prayer.find({ postedBy: req.profile._id })
    .populate("postedBy _id")
    .select("_id title body createdOn")
    .sort("_createdOn")
    .exec((err, prayer) => {
      if (err) {
        return res.status(400).json({
          err: "err"
        });
      }
      res.json(prayer);
      // console.log(prayer);
    });
};

exports.createPrayer = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    let post = new Prayer(fields);

    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(result);
    });
  });
};

exports.singlePrayer = (req, res) => {
  return res.json(req.prayer);
};

exports.editPrayer = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      });
    }
    let prayer = req.prayer;
    prayer = _.extend(prayer, fields);
    prayer.updated = Date.now();

    if (files.photo) {
      prayer.photo.data = fs.readFileSync(files.photo.path);
      prayer.photo.contentType = files.photo.type;
    }

    prayer.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(prayer);
    });
  });
};

exports.deletPrayer = (req, res, next) => {
  let prayer = req.prayer;
  prayer.remove((err, prayer) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({
      message: "Prayer removed successfully"
    });
  });
};

//
///
//
//
//
//
//
// with pagination
exports.allUserPrayersPagination = (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const statIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = {};

  // if (endIndex < prayer.length) {
  result.next = {
    page: page + 1,
    limit: limit
  };
  // }

  // next = {
  //   page: page + 1,
  //   limit: limit
  // };

  // if (statIndex > 0) {
  result.previous = {
    page: page - 1,
    limit: limit
  };
  // }

  // previous = {
  //   page: page - 1,
  //   limit: limit
  // };

  Prayer.find({ postedBy: req.profile._id })
    .populate("postedBy _id")
    .select("_id title body createdOn")
    .sort("_createdOn")
    .exec((err, prayer) => {
      if (err) {
        return res.status(400).json({
          err: "err"
        });
      }
      // res.json(prayer);
      // console.log(prayer);

      result.praydata = prayer.slice(statIndex, endIndex);
      // praydata = prayer.slice(statIndex, endIndex);
      // res.json(prayerdata);
      // console.log(prayer.slice(statIndex, endIndex));
      res.json(result);
      console.log(result);
    });
};
