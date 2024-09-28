const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");

router.get("/", controller.get);
router.get("/signup", controller.getSignup);
router.get("/login", controller.getLogin);
router.post("/login", controller.userLogin);
router.get("/logout", controller.logout);
router.get("/secretMember", controller.getSecretSignup);
router.post("/secretMember/check", controller.postSecretSignup);

module.exports = router;
