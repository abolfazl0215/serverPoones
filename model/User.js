const mongoose = require('mongoose');
const Yup = require('yup');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:25
    },
    email: {
        unique:true,
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

const schema=Yup.object().shape({
    fullName:
        Yup.string()
        .required("1")
        .trim()
        .min(3,"2")
        .max(50,"3"),
    email:
        Yup.string()
        .required("4")
        .trim()
        .min(3,"5")
        .max(50,"6"),
    password:
        Yup.string()
        .required("7")
        .trim()
        .min(3,"8")
        .max(50,"9"),
    confirmPassword:
        Yup.string()
        .required("10")
        .oneOf([Yup.ref("password"),null],"11")
})

userSchema.statics.userValidation = function(body){
    return schema.validate(body,{abortEarly:false})
}

module.exports=mongoose.model("User",userSchema);