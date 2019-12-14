const express = require("express");

const {
  userById,
  getUser,
  updateUser,
  deleteUser,
  hasAuthorization
} = require("../controllers/user-controller");

const { requireSignin } = require("../controllers/auth-controller");

const router = express.Router();

// get account
router.get("/user/:userId", requireSignin, getUser);

// update account
router.put("/user/:userId", requireSignin, hasAuthorization, updateUser);

// delete account
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);

router.param("userId", userById);

module.exports = router;
