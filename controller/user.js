const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User=require('../model/User');

exports.registerUser=async(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    
    const{fullName,email,password} = req.body;
    try {
        await User.userValidation(req.body)
        const userFilter = await User.findOne({ email });
        if (!userFilter) {
            const hash = await bcrypt.hash(password,10)
            await User.create({fullName,email,password:hash})
            const user =await User.findOne({ email });
            const token =await jwt.sign(
                {
                    user: {
                        userId: user._id.toString(),
                        email: user.email,
                        fullName: user.fullName,
                        courses: user.courses
                    },
                },
                process.env.JWT_SECRET
            );
                res.status(201).json({ token})
            }
        else{
            res.status(203).json({message:"person already exist"})
        }
    } catch (err) {
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
    
    const { email, password } = req.body;
    try {
        const user =await User.findOne({ email });
        console.log(user)
        if (!user) {
            const error = new Error("کاربر وجود ندارد");
            error.statusCode = 404;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (isEqual) {
            const token =await jwt.sign(
                {
                    user: {
                        userId: user._id.toString(),
                        email: user.email,
                        fullName: user.fullName,
                        courses:user.courses
                    },
                },
                process.env.JWT_SECRET
            );
            res.status(200).json({ token});
        } else {
            const error = new Error("آدرس ایمیل یا کلمه عبور اشتباه است");
            error.statusCode = 422;
            throw error;
        }
    } catch (err) {
        next(err)
    }

}

exports.getUser = async (req, res) => {
    console.log("ooooo")
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        const token =await jwt.sign(
            {
                user: {
                    userId: user._id.toString(),
                    email: user.email,
                    fullName: user.fullName,
                    courses:user.courses
                },
            },
            process.env.JWT_SECRET
        );
        res.json({token})
        console.log(user)
    } catch (err) {
        console.log(err)
    }
}
