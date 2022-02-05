const router = require("express").Router();
const mongoose = require("mongoose");
const Question = require("../models/Question.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/question", isLoggedIn, (req, res) => {

    const cat = req.query.category || 'JS'
    const dif = req.query.difficulty || 1 //valeur par défaut
    
    Question.find({category: cat, difficulty: dif})
      .then(function (questionFromDb) {
        res.status(200).json(questionFromDb);
        })
        .catch(error => {res.json(error)})
})

router.post("/solution/:question_id", isLoggedIn, (req, res) => {

    //const {response} = req.body

    Question.findById(req.params.question_id)
        .then(questionFromDb => {
           if(questionFromDb.solution === req.body.response) {
            res.status(200).json(questionFromDb); //passer correct_answer dans modèle Answer ?
           } else {
               return res.status(400).json(questionFromDb)
           }
           res.status(200).json(questionFromDb);
        })
        .catch(error => {res.json(error)})
    // retrouver la question depuis la BDD qui porte l'id question_id transmis en route.params
    // comparer que la solution retrouvée depuis la bdd = celle du req.body.response
    
})

module.exports = router;