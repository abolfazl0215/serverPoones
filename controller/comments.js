const Comments = require('../model/Comments');

exports.setComment=async(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
    res.setHeader("Content-Type", "application/x-www-form-urlencoded")

    const{comment,fullName} = req.body;
    // console.log(User.find())
    try {
            Comments.create({comment,fullName})
            res.redirect("/")
    } catch (err) {
        console.log(err)
    }
}

exports.getComment=async(req,res)=>{
    try {
        const comments=await Comments.find();
    res.json({comments})
    res.redirect("/")
    } catch (err) {
        console.log(err)
    }
}