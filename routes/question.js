const router = require("express").Router();
const mongoose = require("mongoose");
const Question = require("../models/Question.model");
const Answer = require("../models/Answer.model");

//  #######  ##     ## ########  ######  ######## ####  #######  ##    ## 
// ##     ## ##     ## ##       ##    ##    ##     ##  ##     ## ###   ## 
// ##     ## ##     ## ##       ##          ##     ##  ##     ## ####  ## 
// ##     ## ##     ## ######    ######     ##     ##  ##     ## ## ## ## 
// ##  ## ## ##     ## ##             ##    ##     ##  ##     ## ##  #### 
// ##    ##  ##     ## ##       ##    ##    ##     ##  ##     ## ##   ### 
//  ##### ##  #######  ########  ######     ##    ####  #######  ##    ## 

router.get("/question", (req, res) => {
  //Check if user is logged in
  if (!req.session.user) return res.status(403).json ({ errorMessage : "Connectez-vous pour commencer à jouer."});

  const cat = req.query.category 
  const dif = req.query.difficulty 
  
  // Obtenir uniquement les q° auxquelles le user n'a pas encore répondu : 
    
  //1_trouver toutes les q° auxquelles il a répondu
  Answer.find()
    .populate('question_id')
    .then(answeredQuestions => {
      var questionsIds= [];
      for (let i=0; i<answeredQuestions.length; i++) {
        questionsIds.push(answeredQuestions[i].question_id._id)
      }
      
      //2_trouver les q° qui ne sont pas parmi cette liste
      Question.find({_id:{ $nin: questionsIds}, category: cat, difficulty: dif},{solution:0})
        .then(newQuestions => {
            newQuestions.map((newQuestion, index) => {
              return res.status(200).json({newQuestion, index, total: newQuestions.length});
            })
          
          // if (!newQuestions.length) {
          //   return res.status(500).json({message: "Vous avez répondu à toutes les questions de cette catégorie et de cette difficulté."})
          // }

          //en tirer une au hasard
          // const rand = Math.floor(Math.random() * newQuestions.length)
          // return res.status(200).json(newQuestions[rand]);
        })
        .catch()
    })
    .catch(error => {return res.json({message: error.message})}) 
})

// ##     ##  ######  ######## ########  ####  ######        ###    ##    ##  ######  ##      ## ######## ########  
// ##     ## ##    ## ##       ##     ## #### ##    ##      ## ##   ###   ## ##    ## ##  ##  ## ##       ##     ## 
// ##     ## ##       ##       ##     ##  ##  ##           ##   ##  ####  ## ##       ##  ##  ## ##       ##     ## 
// ##     ##  ######  ######   ########  ##    ######     ##     ## ## ## ##  ######  ##  ##  ## ######   ########  
// ##     ##       ## ##       ##   ##              ##    ######### ##  ####       ## ##  ##  ## ##       ##   ##   
// ##     ## ##    ## ##       ##    ##       ##    ##    ##     ## ##   ### ##    ## ##  ##  ## ##       ##    ##  
//  #######   ######  ######## ##     ##       ######     ##     ## ##    ##  ######   ###  ###  ######## ##     ## 

router.post("/solution/:question_id", (req, res) => {
  //Check if user is logged in
  if (!req.session.user) return res.status(403).json ({ errorMessage : "Connectez-vous pour répondre aux questions."});

  const {userResponse} = req.body
  
  // retrouve la question qui correspond au :question_id
  Question.findById(req.params.question_id)
    .then(questionFromDb => {
      // compare la solution de la question de la DB et celle de l'utilisateur
      
      if (questionFromDb.solution === userResponse) {
        correct_answer = true;
        Answer.create({user_id: req.session.user._id, round:req.body.correct_answer, question_id: req.params.question_id, correct_answer : correct_answer, solution: questionFromDb.solution})
          .then(answer => res.status(201).json({answer, solution:questionFromDb.solution, round: req.query.round}))
          .catch(error => {res.status(500).json({message: error.message})})
      } else {
        correct_answer = false;
        Answer.create({user_id: req.session.user._id, round:req.body.correct_answer, question_id: req.params.question_id, correct_answer : correct_answer, solution:questionFromDb.solution})
          .then(answer =>res.status(201).json({answer, solution:questionFromDb.solution , round: req.query.round}))
          .catch(error => {res.json({message: error.message})})
      }        
    }).catch(error => {res.json(error)})  
})

// ########  ########  ######  ##     ## ##       ########  ######  
// ##     ## ##       ##    ## ##     ## ##          ##    ##    ## 
// ##     ## ##       ##       ##     ## ##          ##    ##       
// ########  ######    ######  ##     ## ##          ##     ######  
// ##   ##   ##             ## ##     ## ##          ##          ## 
// ##    ##  ##       ##    ## ##     ## ##          ##    ##    ## 
// ##     ## ########  ######   #######  ########    ##     ######  

router.get("/results", (req, res) => {
  //Check if user is logged in
  if (!req.session.user) return res.status(403).json ({ errorMessage : "Connectez-vous pour accéder à vos résultats."});

  const round = req.query.round 
  Answer.find({user_id : req.session.user._id, round: round})
    .populate('question_id')
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {res.json(error)})
})

// #######  ##     ## ########  ######  ######## ####  #######  ##    ##  ######  ####  ######     ##     ## ####  ######  ########  #######  ########  ##    ## 
// ##     ## ##     ## ##       ##    ##    ##     ##  ##     ## ###   ## ##    ## #### ##    ##    ##     ##  ##  ##    ##    ##    ##     ## ##     ##  ##  ##  
// ##     ## ##     ## ##       ##          ##     ##  ##     ## ####  ## ##        ##  ##          ##     ##  ##  ##          ##    ##     ## ##     ##   ####   
// ##     ## ##     ## ######    ######     ##     ##  ##     ## ## ## ##  ######  ##    ######     #########  ##   ######     ##    ##     ## ########     ##    
// ##  ## ## ##     ## ##             ##    ##     ##  ##     ## ##  ####       ##            ##    ##     ##  ##        ##    ##    ##     ## ##   ##      ##    
// ##    ##  ##     ## ##       ##    ##    ##     ##  ##     ## ##   ### ##    ##      ##    ##    ##     ##  ##  ##    ##    ##    ##     ## ##    ##     ##    
//  ##### ##  #######  ########  ######     ##    ####  #######  ##    ##  ######        ######     ##     ## ####  ######     ##     #######  ##     ##    ##    

router.get("/history", (req, res) => {
  //Check if user is logged in
  if (!req.session.user) return res.status(403).json ({ errorMessage : "Connectez-vous pour accéder à votre historique."});

  Answer.find({user_id : req.session.user._id})
    .populate('question_id')
    .then(history => {
      res.status(200).json(history);
    })
    .catch(error => {res.json(error)})
})

module.exports = router;