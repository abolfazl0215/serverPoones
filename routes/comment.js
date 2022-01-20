const express = require('express');
const commentsController=require('../controller/comments');

const router=express.Router();

router.post("/setComment",commentsController.setComment)
router.get("/getComment",commentsController.getComment)


module.exports=router