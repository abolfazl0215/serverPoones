const multer = require('multer');
const uuid = require('uuid').v4;
const user=require('../model/User');

exports.registerUser=async(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
    res.setHeader("Content-Type", "application/x-www-form-urlencoded")

    const{fullName,email,password} = req.body;
    // console.log(User.find())
    try {
        const userFilter = await user.findOne({ email });
        if(!userFilter){

            user.create({fullName,email,password})
            res.status(201).json({message:"created person"})
        }else{
            res.status(203).json({message:"person already exist"})

        }
    } catch (err) {
        console.log(err)
    }
}

exports.loginUser=async(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
    res.setHeader("Content-Type", "application/x-www-form-urlencoded")

    const{email,password} = req.body;
    console.log(email,password)
    try {
        const userEmail = await user.findOne({ email });
        const userPassword = await user.findOne({ password });
        if(userEmail && userPassword){
            res.status(201).json(userEmail.fullName)
        }else{
            res.status(203).json({message:"join error"})
        }
    } catch (err) {
        console.log(err)
    }
}

exports.uploadImage = (req, res) => {
    // let fileName = `${uuid()}.jpg`;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/uploads/");
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, `${uuid()}_${file.originalname}`);
        }, 
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb("تنها پسوند JPEG پشتیبانی میشود", false);
        }
    };

    const upload = multer({
        limits: { fileSize: 4000000 },
        dest: "uploads/",
        storage: storage,
        fileFilter: fileFilter,
    }).single("image");

    upload(req, res, (err) => {
        if(req.file){
            res.status(200).send("آپلود عکس موفقیت آمیز بود");
        }else{
            res.send("جهت آپلود باید عکسی انتخاب کنید")
        }
    });
};