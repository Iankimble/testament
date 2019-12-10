const express = require("express");

const {} = require();

const {} = require();
const {} = require();
const {} = require();

const router = express.Router();

//Get all 'pray for' prayers
router.get();
// Get all 'main prayers'
router.get();
// Get all 'thank you' prayers
router.get();

//Get a 'pray for' prayers by ID
router.get();
// Get a 'main prayer' by ID
router.get();
// Get a 'thank you prayer' by ID
router.get();

// Create a 'pray for' prayer
router.post();
// Create a 'main prayer'
router.post();
// Create a 'thank you' prayer
router.post();

// Edit a 'pray for prayer' by ID
router.put();
// Edit a 'main prayer' by ID
router.put();
// Edit a 'thank you prayer' by ID
router.put();

// Delete a 'pray for prayer' by ID
router.delete();
// Delete a 'main prayer' by ID
router.delete();
// Delete a 'thank you' prayer by ID
router.delete();

router.param("userId");
router.param("postId");

module.exports = router;
