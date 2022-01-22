const { Router } = require('express');
const courseController=require('../controller/courses');

const router = new Router();

// router.post("/course",courseController.getCourse)
router.post("/registerCourse",courseController.registerCourse)
// router.post("/getLength",courseController.getLength)


module.exports=router