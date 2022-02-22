const router = require("express").Router();
const mongoose = require("mongoose");
const Question = require("../models/Question.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Answer = require("../models/Answer.model");

//  #######  ##     ## ########  ######  ######## ####  #######  ##    ## 
// ##     ## ##     ## ##       ##    ##    ##     ##  ##     ## ###   ## 
// ##     ## ##     ## ##       ##          ##     ##  ##     ## ####  ## 
// ##     ## ##     ## ######    ######     ##     ##  ##     ## ## ## ## 
// ##  ## ## ##     ## ##             ##    ##     ##  ##     ## ##  #### 
// ##    ##  ##     ## ##       ##    ##    ##     ##  ##     ## ##   ### 
//  ##### ##  #######  ########  ######     ##    ####  #######  ##    ## 

router.get("/question", isLoggedIn, (req, res) => {
  const cat = req.query.category || 'HTML'
  const dif = req.query.difficulty || 1 //valeur par défaut
  const nb = req.query.number || 'Toutes les questions'
  
  // Obtenir uniquement les q° auxquelles le user n'a pas encore répondu : 
    
  //1_trouver toutes les q° auxquelles il a répondu
  Answer.find()
    .populate('question_id')
    .then(answeredQuestions => {
      var questionsIds= [];
      for (let i=0; i<answeredQuestions.length; i++) {
        questionsIds.push(answeredQuestions[i].question_id)
      }
      
      //2_finder les q° qui ne sont pas parmi cette liste
      Question.find({_id:{ $nin: questionsIds}, category: cat, difficulty: dif},{solution:0})
        .then(newQuestions => {
          newQuestions.map((newQuestion, index) => {
            res.status(200).json({newQuestion, index, total: newQuestions.length});
          })

          //en tirer une au hasard
          // const rand = Math.floor(Math.random() * newQuestions.length)
          // return res.status(200).json(newQuestions[rand]);
        }).catch(error => {res.json(error)})
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
      // compare la solution de la question de la DB et celle de l'utilisateur
      
      if (questionFromDb.solution === userResponse) {
        correct_answer = true;
        Answer.create({user_id: req.session.user._id, question_id: req.params.question_id, correct_answer : correct_answer, solution: questionFromDb.solution})
          .then(answer => res.status(201).json({answer, solution:questionFromDb.solution}))
          .catch(error => {res.status(500).json({message: error.message})})
      } else {
        correct_answer = false;
        Answer.create({user_id: req.session.user._id, question_id: req.params.question_id, correct_answer : correct_answer, solution:questionFromDb.solution})
          .then(answer =>res.status(201).json({answer, solution:questionFromDb.solution}))
          .catch(error => {res.json({message: error.message})})
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

router.get("/history", isLoggedIn, (req, res) => {
  Answer.find({user_id : req.session.user._id})
    .populate('question_id')
    .then(history => {
      res.status(200).json(history);
    })
    .catch(error => {res.json(error)})
})

module.exports = router;