const auth = require("../middleware/auth")
const chatController = require("../controllers/chat")
const express = require('express');

const router = express.Router();



router.post('/sendmessage',auth.authenticate,chatController.sendChat)


module.exports =router