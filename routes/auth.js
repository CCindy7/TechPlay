const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


// ######  ####  ######   ##    ## ##     ## ########  
// ##    ##  ##  ##    ##  ###   ## ##     ## ##     ## 
// ##        ##  ##        ####  ## ##     ## ##     ## 
//  ######   ##  ##   #### ## ## ## ##     ## ########  
//       ##  ##  ##    ##  ##  #### ##     ## ##        
// ##    ##  ##  ##    ##  ##   ### ##     ## ##        
//  ######  ####  ######   ##    ##  #######  ##        

router.post("/signup", isLoggedOut, (req, res) => {
  const { username, email, password, confirmation } = req.body;

  // Validation de tous les champs
  if (!username || ! email) {
    return res
      .status(400)
      .json({ message: "Merci de compléter tous les champs" });
  } else if (!password || ! confirmation) {
    return res
      .status(400)
      .json({ message: "Merci de compléter tous les champs" });
  }

  // Validation mot de passe fort (expression régulière)
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      message:
        "Votre mot de passe doit contenir au moins 8 caractères, un nombre, une minuscule et une majuscule.",
    });
  }
  
  if (password !== confirmation) {
    return res
      .status(400)
      .json({ message: "Les mots de passe ne sont pas identiques." });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ email }).then((found) => {
    // If the user is found, send the message email is taken
    if (found) {
      return res.status(400).json({ message: "Il y a déjà un compte associé à cet email." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          username,
          email,
          password: hashedPassword,
        });
      })
      .then((user) => {
        // Bind the user to the session object
        req.session.user = user;
        res.status(201).json(user);
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            message:
              "Aucun compte n'est associé à cet email.",
          });
        }
        return res.status(500).json({ message: error.message });
      });
  });
});

// ##        #######   ######   #### ##    ## 
// ##       ##     ## ##    ##   ##  ###   ## 
// ##       ##     ## ##         ##  ####  ## 
// ##       ##     ## ##   ####  ##  ## ## ## 
// ##       ##     ## ##    ##   ##  ##  #### 
// ##       ##     ## ##    ##   ##  ##   ### 
// ########  #######   ######   #### ##    ## 

router.post("/login", isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;

  // Validation de tous les champs
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Merci de compléter tous les champs." });
  }

  // Validation mot de passe fort (expression régulière)
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json({
      message: "Votre mot de passe doit contenir au moins 8 charactères, un nombre, une minuscule et une majuscule.",
    });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ email })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(403).json({ message: "L'email est incorrect." });
      }

      // If user is found based on the email, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(403).json({ message: "Le mot de passe est incorrect." });
        }
        req.session.user = user;
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        return res.status(201).json(user);
      });
    })

    .catch((err) => {
      return res.status(500).render("login", { message: err.message });
    });
});

// ##        #######   ######    #######  ##     ## ######## 
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ##       ##     ## ##        ##     ## ##     ##    ##    
// ##       ##     ## ##   #### ##     ## ##     ##    ##    
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ########  #######   ######    #######   #######     ##    

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: "Vous êtes déconnecté." });
  });
});


// ##        #######   ######    ######   ######## ########  #### ##    ## 
// ##       ##     ## ##    ##  ##    ##  ##       ##     ##  ##  ###   ## 
// ##       ##     ## ##        ##        ##       ##     ##  ##  ####  ## 
// ##       ##     ## ##   #### ##   #### ######   ##     ##  ##  ## ## ## 
// ##       ##     ## ##    ##  ##    ##  ##       ##     ##  ##  ##  #### 
// ##       ##     ## ##    ##  ##    ##  ##       ##     ##  ##  ##   ### 
// ########  #######   ######    ######   ######## ########  #### ##    ## 

router.get("/loggedin", (req, res) => {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message })
      })
  } else {
    res.status(403).json({ message: "Vous n'êtes pas connecté" })
  }
});

module.exports = router;