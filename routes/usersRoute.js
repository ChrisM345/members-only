const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.post("/new", controller.createLogin);

module.exports = router;
