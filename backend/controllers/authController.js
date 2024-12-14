const User = require('../Models/User')
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie  = require('../utils/generateTokenAndSetCookie');
 

const signup = async (req,res) =>{
    const {name,email,password} = req.body;

    try {
        if(!name || !email || !password){
           return res.status(400).json({success:"false",message:"please fill all fields"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send({success:"false",message:"user already exist "})
        }

        const hashPassword = await bcrypt.hash(password,10);
        const VerificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        const user = new User({
            email,
            name,
            password:hashPassword,
            VerificationToken,
            VerificationTokenExpiresAt : Date.now() + 24 * 60 * 60 * 1000
        });

        await user.save();

        generateTokenAndSetCookie(res,user._id);

        res.status(201).json({
            success:true,
            message:"user created succesfully",
            user:
            {...user._doc,
            password:undefined},
        })

    } catch (error) {
        console.log(error)
    }
}
 const login = async (req,res) =>{
    try {
        const{email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:"false",message:"please fill all fields"})
        };

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({success:"false",message:"user not found"});

        const finalPassword = await bcrypt.compare(finalPassword,password);

        

    } catch (error) {
        console.log(error) 
    }
}

module.exports = {signup,login}