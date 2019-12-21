const express = require("express");
const {
  userConfirmed,
  prayerById,
  allUserPrayers,
  createPrayer,
  singlePrayer,
  editPrayer,
  deletPrayer,
  appendPrayer
} = require("../controllers/prayer-controller");

const { requireSignin } = require("../controllers/auth-controller");

const { userById } = require("../controllers/user-controller");

const router = express.Router();

// get all users pm prayers (require user signin, get all data)
router.get("/all/prayers/:userId", requireSignin, allUserPrayers);

// get a prayer by id (require user signin, get a single prayer)
router.get("/prayer/:prayerId", singlePrayer);

// user creates prayer (require user signin, create data)
router.post("/new/prayer/:userId", requireSignin, createPrayer);

// user edits a prayer (require user signin, edit data)
router.put("/prayer/:prayerId", requireSignin, editPrayer);

// user deletes a prayer (require user to signin, delete data)
router.delete("/prayer/:prayerId", requireSignin);

// add an additional note to the orignal prayer (require sign in and append data)
router.put("/prayer/append", deletPrayer);

// delete a comment (require signin and delete data)
router.delete("/prayer/unappend");

// edit a comment (require signin and edit data)
router.put("/prayer/append/update");

router.param("userId", userById);

router.param("prayerId", prayerById);

module.exports = router;
