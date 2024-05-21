var express = require("express");
const userModel = require("../models/user");
var router = express.Router();
const upload = require("./multer");
const passport = require("passport");

// Register route
router.post("/register", async (req, res) => {
  try {
    // if (!req.file) {
    //   return res.status(400).send("no files were sent");
    // }
    const { username, email, phone, dateOfBirth, password, role } = req.body;
    console.log(password);
    const userData = new userModel({
      username,
      email,
      phone,
      dateOfBirth,
      // profilePic: req.file.filename,
      role,
    });
    console.log(userData);
    await userModel.register(userData, password).then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
