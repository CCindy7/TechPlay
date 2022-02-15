const router = require("express").Router();
const mongoose = require("mongoose");
const Question = require("../models/Question.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Answer = require("../models/Answer.model");

// ######  #### ##    ##  ######   ##       ########     #######  ##     ## ########  ######  ######## ####  #######  ##    ## 
// ##    ##  ##  ###   ## ##    ##  ##       ##          ##     ## ##     ## ##       ##    ##    ##     ##  ##     ## ###   ## 
// ##        ##  ####  ## ##        ##       ##          ##     ## ##     ## ##       ##          ##     ##  ##     ## ####  ## 
//  ######   ##  ## ## ## ##   #### ##       ######      ##     ## ##     ## ######    ######     ##     ##  ##     ## ## ## ## 
//       ##  ##  ##  #### ##    ##  ##       ##          ##  ## ## ##     ## ##             ##    ##     ##  ##     ## ##  #### 
// ##    ##  ##  ##   ### ##    ##  ##       ##          ##    ##  ##     ## ##       ##    ##    ##     ##  ##     ## ##   ### 
//  ######  #### ##    ##  ######   ######## ########     ##### ##  #######  ########  ######     ##    ####  #######  ##    ## 

router.get("/question", isLoggedIn, (req, res) => {
  const cat = req.query.category || 'HTML'
  const dif = req.query.difficulty || 1 //valeur par défaut
  
  Question.find({category: cat, difficulty: dif}, {solution:0})
    .then(questionFromDb => {
      const rand = Math.floor(Math.random() * questionFromDb.length)
      res.status(200).json(questionFromDb[rand]);
    })
    .catch(error => {res.json(error)})
})

// ##     ##  ######  ######## ########  ####  ######        ###    ##    ##  ######  ##      ## ######## ########  
// ##     ## ##    ## ##       ##     ## #### ##    ##      ## ##   ###   ## ##    ## ##  ##  ## ##       ##     ## 
// ##     ## ##       ##       ##     ##  ##  ##           ##   ##  ####  ## ##       ##  ##  ## ##       ##     ## 
// ##     ##  ######  ######   ########  ##    ######     ##     ## ## ## ##  ######  ##  ##  ## ######   ########  
// ##     ##       ## ##       ##   ##              ##    ######### ##  ####       ## ##  ##  ## ##       ##   ##   
// ##     ## ##    ## ##       ##    ##       ##    ##    ##     ## ##   ### ##    ## ##  ##  ## ##       ##    ##  
//  #######   ######  ######## ##     ##       ######     ##     ## ##    ##  ######   ###  ###  ######## ##     ## 

router.post("/solution/:question_id", isLoggedIn, (req, res) => {
  const {userResponse} = req.body
  
  // retrouve la question qui correspond au :question_id
  Question.findById(req.params.question_id)
    .then(questionFromDb => {
      // console.log('solution: ', questionFromDb.solution)
      // console.log('userResponse : ', userResponse)
      // compare la solution de la question de la DB et celle de l'utilisateur
      if (questionFromDb.solution === userResponse) {
        correct_answer = true;
        Answer.create({user_id: req.session.user._id, question_id: req.params.question_id, correct_answer : correct_answer})
          .then(res.status(200).json({correct_answer : correct_answer, solution : questionFromDb.solution}))
          .catch(error => {res.json(error)})
      } else {
        correct_answer = false;
        Answer.create({user_id: req.session.user._id, question_id: req.params.question_id, correct_answer : correct_answer})
          .then(res.status(200).json({correct_answer : correct_answer, solution : questionFromDb.solution}))
          .catch(error => {res.json(error)})
      }        
    }).catch(error => {res.json(error)})  
})

// #######  ##     ## ########  ######  ######## ####  #######  ##    ##  ######  ####  ######     ##     ## ####  ######  ########  #######  ########  ##    ## 
// ##     ## ##     ## ##       ##    ##    ##     ##  ##     ## ###   ## ##    ## #### ##    ##    ##     ##  ##  ##    ##    ##    ##     ## ##     ##  ##  ##  
// ##     ## ##     ## ##       ##          ##     ##  ##     ## ####  ## ##        ##  ##          ##     ##  ##  ##          ##    ##     ## ##     ##   ####   
// ##     ## ##     ## ######    ######     ##     ##  ##     ## ## ## ##  ######  ##    ######     #########  ##   ######     ##    ##     ## ########     ##    
// ##  ## ## ##     ## ##             ##    ##     ##  ##     ## ##  ####       ##            ##    ##     ##  ##        ##    ##    ##     ## ##   ##      ##    
// ##    ##  ##     ## ##       ##    ##    ##     ##  ##     ## ##   ### ##    ##      ##    ##    ##     ##  ##  ##    ##    ##    ##     ## ##    ##     ##    
//  ##### ##  #######  ########  ######     ##    ####  #######  ##    ##  ######        ######     ##     ## ####  ######     ##     #######  ##     ##    ##    

router.get("/user/history", isLoggedIn, (req, res) => {
  Answer.find({user_id : req.session.user._id})
    .populate('question_id')
    .then(history => {
      res.status(200).json(history);
    })
    .catch(error => {res.json(error)})
})

module.exports = router;