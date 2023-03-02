const express = require('express');
const userController = require('../controllers/user')

const router = express.Router();

router.post('/adduser',userController.setUser)
router.post('/loginuser',userController.loginUser)



module.exports =router