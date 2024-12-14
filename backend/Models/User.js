const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique: true },
    password:{type:String,required:true},
    lastLogin:{type:Date,required:false},
    isVerified:{type:Boolean,default:false},
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    VerificationToken:String,
    VerificationTokenExpiresAt:Date,

},{timestamps:true});

const User = mongoose.model("User",userSchema);

module.exports = User;