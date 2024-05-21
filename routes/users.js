var express = require("express");
const userModel = require("../models/user");
var router = express.Router();

// Register route
router.post("/signup", async (req, res, next) => {
  try {
    // Create user data object
    const userData = new userModel({
      username: "dummy username",
      email: "dummy email",
      fullname: "dummy fullname",
    });

    // Register user (assuming a pre-save hook to hash password)
    const savedUser = await userData.save();

    // Respond with the user object (excluding sensitive information)
    res.status(201).json({
      savedUser,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
