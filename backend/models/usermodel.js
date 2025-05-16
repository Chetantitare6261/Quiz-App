const mongoose = require("mongoose");


const userSchema = new mongoose.Schema ({
    name : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
    },
  
    verifyOtp : {
        type : String,
        default : "",
    },
    verifyOtpExpireAt: {
    type: Number,
    default: 0,
    },
    isAccountVerified: {
      type:Boolean,default:false
    },
    resetPassOtp: {
    type: String,
    default: "",
    },
    resetPassOtpExpireAt: {
    type: Number,
    default: 0,
    },
})

const userModel=mongoose.model("user", userSchema);
module.exports = userModel;