const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const CourseSchema=new Schema({
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    imageURL:{type:String,required:true},
    creatorId:{type:ObjectId,required:true,ref:'admins'}

});
const CourseModel=mongoose.model('courses',CourseSchema);
module.exports=CourseModel;