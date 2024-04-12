const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl.js");
const auth = require("../middlewares/authorization.middleware.js");

//Création d'un utilisateur
router.post("/", userCtrl.signup);

//connexion
router.get("/", userCtrl.login);

//Modification
router.put("/", auth, userCtrl.modify);

module.exports = router;
