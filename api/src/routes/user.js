const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl.js");
const auth = require("../middlewares/authorization.middleware.js");

router.post("/", userCtrl.signup);
router.get("/", userCtrl.login);
router.put("/", auth, userCtrl.modify);

module.exports = router;
