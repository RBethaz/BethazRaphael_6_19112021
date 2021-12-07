//Import de bcrypt pour hashage du mot de passe
const bcrypt = require('bcrypt');

//Import de crypto-js pour chiffrer l'adresse mail
const cryptojs = require("crypto-js");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

exports.signup = (req, res, next) => {
  const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL).toString(cryptojs.enc.Base64);
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: emailCryptoJs,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL).toString(cryptojs.enc.Base64);
    User.findOne({ email: emailCryptoJs })
        .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
              }

        res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {  //(process.env.SECRET_TOKEN)
            expiresIn: "24h", 
          }),
        });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}; 