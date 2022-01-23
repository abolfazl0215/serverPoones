const User=require('../model/User');

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
exports.getLength = async (req, res) => {
    
    try {
        const { course } = req.body;
        const finded =await User.find({ courses:course })
        res.json({length:finded.length})
        
    } catch (err) {
            console.log(err)
        }
    }


