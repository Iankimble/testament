const express = require("express");
const {
  userConfirmed,
  prayerById,
  allUserPrayers,
  createPrayer,
  singlePrayer,
  editPrayer,
  deletPrayer,
  allUserPrayersPagination,
  addNote,

  removeNote
} = require("../controllers/prayer-controller");

const { requireSignin } = require("../controllers/auth-controller");

const { userById } = require("../controllers/user-controller");

const router = express.Router();

//------------------------------------------------------------------//
// get all user prayers with pagination
router.get("/all/:userId", requireSignin, allUserPrayersPagination);
//------------------------------------------------------------------//

// get all users pm prayers (require user signin, get all data)
router.get("/all/prayers/:userId", requireSignin, allUserPrayers);

// get a prayer by id (require user signin, get a single prayer)
router.get("/prayer/:prayerId", singlePrayer);

// user creates prayer (require user signin, create data)
router.post("/new/prayer/:userId", requireSignin, createPrayer);

// user edits a prayer (require user signin, edit data)
router.put("/prayer/:prayerId", requireSignin, editPrayer);

// user deletes a prayer (require user to signin, delete data)
router.delete("/prayer/:prayerId", requireSignin, deletPrayer);

//--------------------------------------------------------------//
//  add a note to prayer
router.post("/prayer/addnote", requireSignin, addNote);
//comment

// remove note on prayer
router.post("/prayer/removenote", requireSignin, removeNote);
// uncomment

//------------------------------------------------------------//
router.param("userId", userById);

router.param("prayerId", prayerById);

module.exports = router;
