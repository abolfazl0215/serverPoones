const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    nameCourse:{
        type:String,
        required:true,
        trim:true,
    },
    price: {
        type: Number,
        required: true,
    },
})

module.exports=mongoose.model("Course",userSchema);