const express = require('express');
const userController = require('../controllers/user')

const router = express.Router();

router.post('/adduser',userController.setUser)
router.post('/loginuser',userController.loginUser)
router.get('/users',userController.getUsers)




module.exports =router