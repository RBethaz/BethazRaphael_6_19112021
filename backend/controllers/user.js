// Import des models de la DB User.js
const User = require("../models/User");

// Import de bcrypt pour le hashage du mot de passe
const bcrypt = require("bcrypt");

// Import de crypto-js pour chiffrer l'adresse mail
const cryptojs = require("crypto-js");

const jwt = require("jsonwebtoken");

// Import des variables d'environnement
require('dotenv').config();

//------------------------------------------------------------------------------------
// Enregistrement d'un nouvel user dans la DB
exports.signup = (req, res, next) => {

// Chiffrage l'email avant de l'envoyer à la DB
  const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL)
    .toString(cryptojs.enc.Base64);

// Hash du mot de passe avant de l'envoyer à la DB
// Comprendre la logique de création de token --> 3 parties du token
  bcrypt
    .hash(req.body.password, 10) // 10 --> salt (execution de l'algo de hashage)
    .then((hash) => {

    // --> Ce qui va etre enregistré par MongoDB
      const user = new User({
        email: emailCryptoJs,
        password: hash,
      });

    // Envoi du user à la DB MongoDB  
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//------------------------------------------------------------------------------------
// Login pour s'authentifier
exports.login = (req, res, next) => {

// Chiffrer l'email de la requete  
  const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL)
    .toString(cryptojs.enc.Base64);

// Chercher dans la DB si l'user est bien présent  
  User.findOne({ email: emailCryptoJs })

  // Si le mail de l'user n'éxiste pas
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //console.log(user);

  // Controler la validité du password envoyé par le front    
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {

        // Si le password est invalide        
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }

        // Si le password est valide
        // Envoi dans la réponse du serveur du userId et du token
          res.status(200).json({
          // Encodage de userId pour la création de nouveaux objets (lien entre objet et userId)
            userId: user._id,
            token: jwt.sign(
              { userId: user._id }, 
              `${process.env.SECRET_TOKEN}`, 
              {expiresIn: "24h"}
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};