const course=require('../model/Course');

exports.getUser=async(req,res)=>{
    try {
        const users=await course.find()
    res.render("index",{
        users
    })
} catch (err) {
        res.render("index")
        
    }
}