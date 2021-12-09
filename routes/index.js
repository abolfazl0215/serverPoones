const express = require('express');
const getUserController=require('../controller/getUser');

const router=express.Router();

router.get("/",getUserController.getUser)


module.exports=router