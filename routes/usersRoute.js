const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/new", controller.get);

module.exports = router;
