var express = require("express");
const userModel = require("../models/user");
var router = express.Router();
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});

// signup page
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

// login page display
router.get("/loginpage", function (req, res) {
  res.render("login");
});

// login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/loginpage",
    failureFlash: true,
  })
);

// logout logic
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/loginpage");
  });
});

module.exports = router;
