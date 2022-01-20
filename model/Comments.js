const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:400
    },
    fullName: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: false
    },
    isAllowed: {
        type: Boolean,
        default: false
    },
})


module.exports=mongoose.model("Comments",userSchema);