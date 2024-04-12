const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");

//Création d'un utilisateur
router.post('/', userCtrl.signup);

//connexion
router.get('/', userCtrl.login);

//Modification
router.put('/', userCtrl.modify);

module.exports = router;