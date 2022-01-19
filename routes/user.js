const { Router } = require('express');
const userController = require('../controller/user');

const router=new Router();

router.post("/register",userController.registerUser)
router.post("/login",userController.handleLogin)

module.exports=router