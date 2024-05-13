const express = require("express");
const router = express.Router();
const roomCtrl = require("../controllers/roomCtrl.js");
const auth = require("../middlewares/authorization.middleware.js");

router.post("/", auth, roomCtrl.create);
router.get("/:code", auth, roomCtrl.get);
router.get("/players/:id", auth, roomCtrl.getPlayers);
router.get("/messages/:id", auth, roomCtrl.getMessages);
router.put("/disable/:id", auth, roomCtrl.disable);

module.exports = router;
