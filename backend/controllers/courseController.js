const CourseModel=require('../models/Course');
const bcrypt = require('bcrypt');
const {z}=require('zod');
const jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
}
const userPurchases=async(req,res)=>{

}
const coursePurchase=async(req,res)=>{

}
const courses=async(req,res)=>{

}


module.exports={userPurchases,courses,coursePurchase};