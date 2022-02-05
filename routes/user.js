const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/user", isLoggedIn, (req, res) => {
    User.findById(req.session.user._id)
      .then(function (userFromDb) {
          res.status(200).json(userFromDb);
      })
      .catch(error => {res.json(error)})
})

router.put("/user", isLoggedIn, (req, res) => {
    User.findByIdAndUpdate(req.session.user._id, req.body, {new:true})
      .then(function (userFromDb) {
          res.status(200).json(userFromDb);
      })
      .catch(error => {res.json(error)})
})

module.exports = router;