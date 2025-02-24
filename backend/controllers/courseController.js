const CourseModel=require('../models/Course');
const bcrypt = require('bcrypt');
const {z}=require('zod');
const jwt = require('jsonwebtoken');


const deleteCourse=async(req,res)=>{
    try{
    if(!req.userId){
        return res.status(403).json({message:'Not authorized'});
    }
    const {title}=req.body;
    const userId=req.userId;
    if(!title){
        return res.status(400).json({message:'No title in the body'});
    }
    const course=await CourseModel.findOne({
        title:title,
        creatorId:userId
    });
    if(!course){
        return res.status(404).json({message:'The course was not found '});
    }
    
    await CourseModel.deleteOne({
        title:title,
        creatorId:userId
    });
    return res.status(200).json({message:'the course was deleted'});
}
    catch(err){
        return res.status(500).json({messaege:'There was error in deleting the course',error:err});
    }
}
const courses=async(req,res)=>{
    try{
        const allCourses=await CourseModel.find();
        if(allCourses.length===0){
            return res.status(200).json({message:'There are no course currently'});
        }
        return res.status(200).json({success:true,courses:allCourses});

    }
    catch(err){
        return res.status(500).json({success:false,message:'Error in reteriving the courses from database',error:err});
    }

}
const createcourse=async(req,res)=>{
    try{
        if(!req.userId){
            return res.status(403).json({message:'Not authorized'});
        }
        const creatorId=req.userId;
        let {title,description,price,imageURL}=req.body;
        price=parseFloat(price);
        const bodySchema = z.object({
            title: z.string().min(3).max(100).string(),
            description: z.string().min(10).max(500),
            price: z.number().min(0),
            imageURL: z.string().url(),
        });
        const parsedSuccess = bodySchema.safeParse({ title, description, price, imageURL });

        if (!parsedSuccess.success) {
            return res.status(400).json({
                message: "There was an error with the course information",
                error: parsedSuccess.error.format(),
            });
        }
        const newCourse= await CourseModel.create({
            title,
            description,
            price,
            imageURL,
            creatorId
        });
        return res.status(201).json({message:'The course was added ',course:newCourse});
    }
    catch(err){
        return res.status(500).json({message:'There was error creating the course ',error:err});s
    }

    
    
    
    
}



module.exports={courses,deleteCourse,createcourse};