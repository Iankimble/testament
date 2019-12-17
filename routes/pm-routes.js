const express = require("express");
const {
  userConfirmed,
  pmById,
  allUserPm,
  createPm,
  singlePm
} = require("../controllers/mainPrayer-controller");

const { requireSignin } = require("../controllers/auth-controller");

const { userById } = require("../controllers/user-controller");

const router = express.Router();

// get all users pm prayers (require user signin, get all data)
router.get("/all/pm/:userId", requireSignin, allUserPm);

// get a prayer by id (require user signin, get a single prayer)
router.get("/pm/:pmId", requireSignin, singlePm);

// user creates prayer (require user signin, create data)
router.post("/create/new/pm/:userId", requireSignin, createPm);

// // user edits a prayer (require user signin, edit data)
// router.put("/pm/:pmId");

// // user deletes a prayer (require user to signin, delete data)
// router.delete("/pm/:pmId");

// // add an additional note to the orignal prayer (require sign in and append data)
// router.put("/pm/append");

// // delete a comment (require signin and delete data)
// router.delete("/pm/unappend");

// // edit a comment (require signin and edit data)
// router.put("/pm/append/update");

router.param("userId", userById);

router.param("pmId", pmById);

module.exports = router;
