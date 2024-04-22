const express = require("express");
const router = express.Router();
const gameCtrl = require("../controllers/gameCtrl.js");
const auth = require("../middlewares/authorization.middleware.js");

router.post("/:roomId", auth, gameCtrl.create);
router.put("/disable/:id", auth, gameCtrl.disable);

module.exports = router;