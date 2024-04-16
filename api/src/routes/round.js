const express = require("express");
const router = express.Router();
const roundCtrl = require("../controllers/roundCtrl.js");
const auth = require("../middlewares/authorization.middleware.js");

router.post("/", auth, roundCtrl.create);
router.put("/disable/:id", auth, roundCtrl.disable);
router.put("/:id", auth, roundCtrl.get);
router.put("/bet/:id", auth, roundCtrl.getBets);

module.exports = router;