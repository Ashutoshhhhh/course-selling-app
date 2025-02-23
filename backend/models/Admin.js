const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const AdminSchema=new Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
});

const AdminModel=mongoose.model('admins',AdminSchema);

module.exports=AdminModel;
