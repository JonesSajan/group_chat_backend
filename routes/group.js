const auth = require("../middleware/auth")
const groupController = require("../controllers/group")
const express = require('express');

const router = express.Router();



router.post('/creategroup',auth.authenticate,groupController.createGroup)
router.post('/removeusers',auth.authenticate,groupController.removeMembers)
router.get('/groups',auth.authenticate,groupController.getGroups)
router.get('/users/:groupid',auth.authenticate,groupController.getGroupMembers)


module.exports =router