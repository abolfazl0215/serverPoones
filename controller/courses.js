const course=require('../model/Course');

exports.getCourse=async(req,res)=>{
    try {
        const courses=await course.find()
        res.json({courses})
    res.render("index",{
        users
    })
} catch (err) {
        res.render("index")
        
    }
}

// exports.setCourse=(req,res)=>{

//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Max-Age", "1800");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
//     res.setHeader("Content-Type", "application/x-www-form-urlencoded")

//     const{nameCourse,price} = req.body;
//     // console.log(User.find())
 

//             course.create({nameCourse,price})
//             res.status(201).json({message:"created course"})
        
// }
