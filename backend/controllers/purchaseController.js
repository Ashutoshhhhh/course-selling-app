const PurchaseModel=require('../models/Purchases');
const CourseModel=require('../models/Course');
const {z}=require('zod');
const { z } = require('zod');
const { courses } = require('./courseController');

const userPurchases= async(req,res)=>{
    try{
        const userId=req.userId;
        if(!userId){
            return res.status(400).json({message:'No user found'});
        }
        const userCoursesId=await PurchaseModel.find({userId});
        
        if(userCoursesId.length==0){
            return res.status(200).json({message:'The user dont have any purchased course yet'});
        }
        const coursesInfo=await Promise.all(
            userCoursesId.map(async(courses)=>{
                return await CourseModel.findById(courses.courseId)
            })
        );
        return res.status(200).json({
            message: 'User purchased courses retrieved successfully',
            courses: coursesInfo,
        });
        
    }
    catch(err){
        return res.status(500).json({
            message: 'There was an error retrieving the purchased courses',
            error: err.message,
        });

    }

}



const purchasecourse = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // ✅ Validate request body with Zod
        const bodySchema = z.object({
            courseId: z.string(), // ✅ Use `courseId` instead of `title`
        });

        const parsed = bodySchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: 'Invalid request body',
                error: parsed.error.format(),
            });
        }

        const { courseId } = req.body; // ✅ Extract validated courseId

        // ✅ Check if the course exists
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'The course does not exist' });
        }

        // ✅ Check if the user has already purchased the course
        const alreadyPurchased = await PurchaseModel.findOne({
            courseId: course._id,
            userId: userId,
        });

        if (alreadyPurchased) {
            return res.status(400).json({ message: 'You have already purchased this course' });
        }

        // ✅ Save the purchase
        await PurchaseModel.create({
            courseId: course._id,
            userId: userId,
        });

        return res.status(200).json({ message: 'You have successfully purchased the course' });

    } catch (err) {
        return res.status(500).json({
            message: `There was an error purchasing the course`,
            error: err.message,
        });
    }
};



module.exports={userPurchases,purchasecourse};