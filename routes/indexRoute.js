const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");

router.get("/", controller.get);
router.get("/signup", controller.getSignup);

module.exports = router;
