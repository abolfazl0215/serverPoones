const {Router} = require('express');
const getUserController=require('../controller/getUser');

const router=new Router();

router.get("/",getUserController.getUser)


module.exports=router