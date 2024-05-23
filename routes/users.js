var express = require("express");
const userModel = require("../models/user");
var router = express.Router();
const upload = require("./multer");
const passport = require("passport");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { fullname, username, email, phone, password, role } = req.body;
    const userData = new userModel({
      fullname,
      username,
      email,
      password,
      phone,
      role,
    });
    await userModel.register(userData, password).then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/dashboard");
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
