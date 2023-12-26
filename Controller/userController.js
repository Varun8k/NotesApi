const userModel=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const signup=async(req,res)=>{
//check existing user
//hash code generation
//user creation
//token generation
const {username,email,password}=req.body
try {
    const existinguser=await userModel.findOne({email:email});
    if (existinguser) {
        return res.status(400).json({message:"user already exsist"})
    }
    const hashcode=await bcrypt.hash(password,10);
const result=await userModel.create({
    email:email,
    password:hashcode,
    username:username
})

const token=jwt.sign({email:result.email,id:result._id},process.env.SECRET_KEY)
res.status(201).json({user:result,token:token})

} catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"})
}
}
const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existinguser=await userModel.findOne({email:email});
        if (!existinguser) {
            return res.status(404).json({message:"user not exsist"})
        }
        const matchpass=await bcrypt.compare(password,existinguser.password)
        if (!matchpass) {
            return res.status(400).json({message:"invalid Credentials"})
        }

        const token=jwt.sign({email:existinguser.email,id:existinguser._id},process.env.SECRET_KEY)
        res.status(200).json({user:existinguser,token:token})


    } catch (error) {
        console.log(error);
    res.status(500).json({message:"something went wrong"})
    }
    
}
module.exports={signin,signup}