const router = require("express").Router();
const mongoose = require("mongoose");
const Question = require("../models/Question.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/question/category&difficulty", isLoggedIn, (req, res) => {
    
    Question.find({category:req.query.category})
      .then(function (questionFromDb) {
        Question.find({difficulty:req.query.difficulty})
        .then(function (qualifiedQuestionFromDb) {
            res.status(200).json(qualifiedQuestionFromDb);
        })
        .catch(error => {res.json(error)})
      })
      .catch(error => {res.json(error)})

})

router.post("/solution/:question_id", isLoggedIn, (req, res) => {
    if(req.body.propositions === req.body.solution) {
        
    }
})

module.exports = router;