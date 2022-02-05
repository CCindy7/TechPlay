const router = require("express").Router();
const mongoose = require("mongoose");
const Question = require("../models/Question.model");

router.get("/question", isLoggedIn, (req, res) => {
    const query = {}
    if (req.query.category) {
        query.category = req.query.qcategory
    }
    if (req.query.difficulty) {
        query.difficulty = req.query.qdifficulty
    }

    Question.find(questionFromDb)
      .then(function (questionFromDb) {
          res.status(200).json(questionFromDb);
      })
      .catch(error => {res.json(error)})
})
module.exports = router;