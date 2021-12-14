const express = require("express");
const router = express.Router();

// Import du controller (logique metier)
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router; 