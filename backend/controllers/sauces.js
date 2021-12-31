const Sauce = require("../models/sauce");
const fs = require("fs"); //Permet d'avoir accès aux différentes opérations liées au système de fichiers

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); //Récupère l'objet json de la sauce
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, //Génère l'URL de l'image en créant une chaîne dynamique de l'URL
    likes: 0,
    dislikes: 0,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  if (req.file) {
    //si on trouve un fichier image dans la requête alors
    Sauce.findOne({ _id: req.params.id }) //Recherche la sauce avec cet Id
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, (err) => {
          //supprime cette photo qui est donc l'ancienne
          if (err) throw err;
        });
      })
      .catch((error) => res.status(400).json({ error }));
  }

  const sauceObject = req.file // si on trouve un fichier image dans la requête alors
    ? {
        ...JSON.parse(req.body.sauce), //on récupère l'objet json
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`, //et on ajoute l'image URL
      }
    : { ...req.body }; //sinon on prend le corps de la requête
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  ) //On modifie celui dont l'ID est égale à l'ID envoyé dans les paramètres de requêtes
    .then(() => res.status(200).json({ message: "Sauce modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //Recherche la sauce avec cet Id
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1]; //Récupère le nom du fichier précisément
      fs.unlink(`images/${filename}`, () => {
        //Supprime l'image du dossier images
        Sauce.deleteOne({ _id: req.params.id }) //Supprime cette sauce identifiée avec cet Id
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //Recherche la sauce avec cet Id
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find() //Recherche toutes les sauces
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.likedStatus = (req, res, next) => {

  if (req.body.like === 1) { //si like est a 1
    Sauce.findOne({

      _id: req.params.id

  })

  .then(sauce => {

      if (sauce.usersLiked.includes(req.body.userId))
{

          res.status(400).json({

              message: "Utilisateur à déjà un like"

          })

      } else {

          Sauce.updateOne({

                  _id: req.params.id

              }, {

                  $inc: {

                      likes: req.body.like++

                  },

                  $push: {

                      usersLiked: req.body.userId

                  }

              })

              .then(() => res.status(200).json({

                  message: "Utilisateur à liker"

              }))

              .catch((error) => res.status(400).json({

                  error

              }))




      }

  })

  } else if (req.body.like == -1) { //si like est a -1
    Sauce.findOne({

      _id: req.params.id

  })

  .then(sauce => {

      if (sauce.usersDisliked.includes(req.body.userId))
{

          res.status(400).json({

              message: "Utilisateur à déjà un dislike"

          })

      } else {

          Sauce.updateOne({

                  _id: req.params.id

              }, {

                  $inc: {

                      dislikes: -(parseInt(req.body.like++))

                  },

                  $push: {

                      usersDisliked: req.body.userId

                  }

              })

              .then(() => res.status(200).json({

                  message: "Utilisateur à disliker"

              }))

              .catch((error) => res.status(400).json({

                  error

              }))




      }

  })
        
  } else {
      Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
          if (sauce.usersLiked.includes(req.body.userId)){ //si userId est présent dans le tableau usersLiked alors
              Sauce.updateOne( //On modifie celui dont l'ID est égale à l'ID envoyé dans les paramètres de requêtes avec Like a -1 et en enlevant userId dans le tableau usersLiked
              { _id: req.params.id },
              { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }},
              { _id: req.params.id }
              )
                  .then(() => res.status(200).json({ message: 'Je n\'aime plus' }))
                  .catch((error) => res.status(400).json({ error }));
          
          } else if (sauce.usersDisliked.includes(req.body.userId)){ //si userId est présent dans le tableau usersDisliked alors
              Sauce.updateOne( //On modifie celui dont l'ID est égale à l'ID envoyé dans les paramètres de requêtes avec Dislike a -1 et en enlevant userId dans le tableau usersDisliked
              { _id: req.params.id },
              { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }},
              { _id: req.params.id }
              )
                  .then(() => res.status(200).json({ message: 'Je commence à aimer' }))
                  .catch((error) => res.status(400).json({ error }));
          } 
        }
      )
      .catch((error) => res.status(400).json({ error }));
}}

  
