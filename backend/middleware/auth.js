const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Récupère seulement le token du header authorization de la requête
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); //Decode le token en vérifiant le token avec celui présent dans la fonction login
    const userId = decodedToken.userId; //Récupère le userId
    if (req.body.userId && req.body.userId !== userId) {
      //Vérifie s'il y a un userId dans la requête et que celui ci est différent de l'user Id alors
      throw "Invalid user ID"; //Renvoie l'erreur
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
