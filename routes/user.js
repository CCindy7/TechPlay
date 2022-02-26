const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");

// ##     ##  ######  ######## ########     #### ##    ##     ######  ########  ######   ######  ####  #######  ##    ## 
// ##     ## ##    ## ##       ##     ##     ##  ###   ##    ##    ## ##       ##    ## ##    ##  ##  ##     ## ###   ## 
// ##     ## ##       ##       ##     ##     ##  ####  ##    ##       ##       ##       ##        ##  ##     ## ####  ## 
// ##     ##  ######  ######   ########      ##  ## ## ##     ######  ######    ######   ######   ##  ##     ## ## ## ## 
// ##     ##       ## ##       ##   ##       ##  ##  ####          ## ##             ##       ##  ##  ##     ## ##  #### 
// ##     ## ##    ## ##       ##    ##      ##  ##   ###    ##    ## ##       ##    ## ##    ##  ##  ##     ## ##   ### 
//  #######   ######  ######## ##     ##    #### ##    ##     ######  ########  ######   ######  ####  #######  ##    ## 

router.get("/user", isLoggedIn, (req, res) => {
    User.findById(req.session.user._id)
      .then(userFromDb => {
        res.status(200).json(userFromDb);
      })
      .catch(error => {res.json(error)})
})

// ##     ## ########  ########     ###    ######## ########    ##     ##  ######  ######## ########  ##    ##    ###    ##     ## ######## 
// ##     ## ##     ## ##     ##   ## ##      ##    ##          ##     ## ##    ## ##       ##     ## ###   ##   ## ##   ###   ### ##       
// ##     ## ##     ## ##     ##  ##   ##     ##    ##          ##     ## ##       ##       ##     ## ####  ##  ##   ##  #### #### ##       
// ##     ## ########  ##     ## ##     ##    ##    ######      ##     ##  ######  ######   ########  ## ## ## ##     ## ## ### ## ######   
// ##     ## ##        ##     ## #########    ##    ##          ##     ##       ## ##       ##   ##   ##  #### ######### ##     ## ##       
// ##     ## ##        ##     ## ##     ##    ##    ##          ##     ## ##    ## ##       ##    ##  ##   ### ##     ## ##     ## ##       
//  #######  ##        ########  ##     ##    ##    ########     #######   ######  ######## ##     ## ##    ## ##     ## ##     ## ######## 

router.put("/edit/:id", (req, res) => {
  //Check if user is logged in
  if (!req.session.user) return res.status(403).json ({ errorMessage : "Vous devez être connecté pour récupérer votre profil."});

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
    User.findByIdAndUpdate(req.params.id, {username: req.body.username}, {new:true})
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {res.json(error)})
})

module.exports = router;