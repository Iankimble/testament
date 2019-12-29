const Prayer = require("../models/Prayer-model");
const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");

exports.prayerById = (req, res, next, id) => {
  Prayer.findById(id)
    .populate("postedBy", "_id")
    .populate("notes.postedBy", "_id")
    .populate("postedBy", "_id")
    .select("_id title body createdOn notes")
    .exec((err, prayer) => {
      if (err || !prayer) {
        return res.status(400).json({
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

    // if (files.photo) {
    //   post.photo.data = fs.readFileSync(files.photo.path);
    //   post.photo.contentType = files.photo.type;
    // }
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

exports.deletPrayer = (req, res) => {
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

  result.next = {
    page: page + 1,
    limit: limit
  };

  result.previous = {
    page: page - 1,
    limit: limit
  };

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
      result.praydata = prayer.reverse().slice(statIndex, endIndex);
      res.json(result.praydata);
      console.log(result);
    });
};
//
//
//

/// NOTE LOGIC

//
//
//
exports.addNote = (req, res) => {
  let note = req.body.note;
  note.postedBy = req.body.userId;

  Prayer.findByIdAndUpdate(
    req.body.prayerId,
    { $push: { notes: note } },
    { new: true }
  )
    .populate("notes.postedBy", "_id")
    .populate("postedBy", "_id")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        res.json(result);
      }
    });
};

exports.removeNote = (req, res) => {
  let note = req.body.note;
  note.postedBy = req.body.userId;

  Prayer.findByIdAndUpdate(
    req.body.prayerId,
    { $pull: { notes: { _id: note._id } } },
    { new: true }
  )
    .populate("notes.postedBy", "_id ")
    .populate("postedBy", "_id ")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        res.json(result);
      }
    });
};
