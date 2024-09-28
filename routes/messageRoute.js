const express = require("express");
const router = express.Router();
const controller = require("../controllers/messageController");

router.get("/", controller.getCreateMessageForm);

module.exports = router;
