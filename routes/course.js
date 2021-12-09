const express = require('express');
const courseController=require('../controller/courses');

const router=express.Router();

router.post("/course",courseController.getCourse)


module.exports=router