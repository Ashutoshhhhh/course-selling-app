const UserModel=require('../models/User');
const bcrypt = require('bcrypt');
const {z}=require('zod');
const jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
}

const signin=async(req,res)=>{
    const {email,password}=req.body;
    const bodySchema=z.object({
        email:z.string().min(8).max(50).email(),
        password:z.string().min(8).max(20).refine(val=>{
            return /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) 
        },{
            message:'Password must contain at least one uppercase letter, one lowercase letter, one number'
        })
    }
    );
    const parsedSuccess=bodySchema.safeParse({email,password});
    if(!parsedSuccess.success){
        return res.status(400).json({message:`${parsedSuccess.error.format()}`});
    }
    let user;
    try{
        user=await UserModel.findOne({
            email:email

        });
        if(!user){
            return res.status(404).json({message:'The user with the given email does not exsists'});
        }
        if(! await bcrypt.compare(password,user.password)){
            return res.status(401).json({message:'The password you provided is wrong'});
        }
        const token=jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'1h'});
        return res.status(200).json({message:'Logged in successfully',token:token});

        
    }
    catch(err){
        return res.status(500).json({message:`Error in the logging in ${err}`});
    }
}





module.exports={signin,signup};