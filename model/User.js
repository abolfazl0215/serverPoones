const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:25
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
})

module.exports=mongoose.model("User",userSchema);