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

router.put("/user", isLoggedIn, (req, res) => {
    User.findByIdAndUpdate(req.session.user._id, {username: req.body.username}, {new:true})
      .then(userFromDb => {
        res.status(200).json(userFromDb);
      })
      .catch(error => {res.json(error)})
})

module.exports = router;