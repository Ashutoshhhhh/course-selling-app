const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const AdminSchema=new Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true}
});

const AdminModel=mongoose.model('AdminUsers',AdminSchema);

module.exports=AdminModel;
