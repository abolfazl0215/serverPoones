const bcrypt = require('bcryptjs');
const passport = require("passport");

const User=require('../model/User');

exports.registerUser=async(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    
    const{fullName,email,password} = req.body;
    // console.log(User.find())
    try {
        await User.userValidation(req.body)
        const userFilter = await User.findOne({ email });
        if (!userFilter) {
            const hash = await bcrypt.hash(password,10)
            await User.create({fullName,email,password:hash})
            res.status(201).json({message:"created person"})
        }
        else{
            res.status(203).json({message:"person already exist"})
        }
    } catch (err) {
        // const errors = [];
        // err.inner.forEach((e) => {
        //     errors.push({
        //         name: e.path,
        //         message: e.message,
        //     });
        // });
        // res.json(errors)
        console.log(err)
    }
}

exports.handleLogin = async (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "8800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
    res.setHeader("Content-Type", "application/x-www-form-urlencoded")
    try {
        const findUser = await User.findOne({ email:req.body.email });
        passport.authenticate('local', function(err, user) {
        if (err) { return next(err); } 
        if (!user) {
            res.status(203).json({ message: "کاربر وجود ندارد" }); 
        } else {
            res.status(201).json(findUser.fullName);
        } 
    })(req, res, next)
    } catch (err) {
        console.log(err)
    }
}
