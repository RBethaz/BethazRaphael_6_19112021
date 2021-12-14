// Install d'express --> deploiement de l'API

const express = require("express");
const bodyParser = require("body-parser"); // extrait le corp d' une requete et l' expose dans req.body
const helmet = require("helmet"); // securise express en configurant divers headers
const mongoose = require("mongoose"); // facilite les interactions avec MongoDB
const path = require("path"); // nouvelle importation (images --> dossier statique) dans app.js pour acceder au path du serveur --> 
require('dotenv').config();

// Import des routes user et sauce
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

mongoose.connect("mongodb+srv://RaphBeth:eTRKIpvfP2dxWwAA@cluster0.bkcmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Creation de l'application
  const app = express();

// Ajout des headers permettant d'acceder a l'API depuis n'importe quelle  origine - d' ajouter les headers aux requetes envoyees vers l' API - d' envoyer des requetes avec les methodes mentionnees
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

app.use(bodyParser.json()); // 

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, "images")));

// Enregistrement du router pour toutes les demandes effectuees vers l' API
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app