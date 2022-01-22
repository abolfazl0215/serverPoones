const course=require('../model/Course');
const User=require('../model/User');

// exports.getCourse=async(req,res)=>{
//     try {
//         const courses=await course.find()
//         res.json({courses})
//     res.render("index")
// } catch (err) {
//         res.render("index")   
//     }
// }

exports.registerCourse = async (req, res) => {
    
    try {
        const { email,course } = req.body;
        const findUser = await User.findOne({ email });

        const arr = [];
            findUser.courses.map(e => arr.push(e))
        // if ( || findUser.courses) {
        if (findUser.courses.length < 1) {
            arr.push(course)
            findUser.courses = arr;
            findUser.save()
            res.status(201).json({ })
        }
        if (!findUser.courses.find(e => e == course)) {
            arr.push(course)
            findUser.courses = arr;
            findUser.save()
            res.status(201).json({ })
        }
        
        
    } catch (err) {
            console.log(err)
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
