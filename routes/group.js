const auth = require("../middleware/auth")
const groupController = require("../controllers/group")
const express = require('express');

const router = express.Router();



router.post('/creategroup',auth.authenticate,groupController.createGroup)
router.get('/groups',auth.authenticate,groupController.getGroups)


module.exports =router