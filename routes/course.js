const {Router} = require('express');
const courseController=require('../controller/courses');

const router=new Router();

router.post("/course",courseController.getCourse)


module.exports=router