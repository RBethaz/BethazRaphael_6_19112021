// Install du package permettant de gerer les fichiers entrants dans les requetes http
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  //Créé un objet de configuration pour multer pour l'enregistrer sur le disque
  destination: (req, file, callback) => {
    //La destination d'enregistrement
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    //Nom de fichier utilisé
    const name = file.originalname.split(" ").join("_"); //Utilise le nom d'origine en remplaçant les espaces par des undescores
    const extension = MIME_TYPES[file.mimetype]; //Génère l'extension
    callback(null, name + Date.now() + "." + extension); //Nom final
  },
});

module.exports = multer({ storage: storage }).single("image"); //méthode single pour dire que c'est un fichier unique
