const express = require("express");
const router = express.Router();

// Verifier le token a chaque requete
const auth = require("../middleware/auth");

// Import du controller (logique metier) CRUD
const saucesCtrl = require("../controllers/sauces");\

// Permet de gerer l' upload d'images lors de l' ajout ou la modification d' une sauce
const multerConfig = require("../middleware/multer-config");

router.post("/", auth, multerConfig, saucesCtrl.createSauce);
router.post("/:id/like", auth, saucesCtrl.likeDislikeSauce);
router.put("/:id", auth, multerConfig, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.get("/", auth, saucesCtrl.getAllSauces);
//router.post('/:id/like', auth, saucesCtrl.addLike);

module.exports = router; 
