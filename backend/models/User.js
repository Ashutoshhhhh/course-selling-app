const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const UserSchema=new Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true}
});







const UserModel=mongoose.model('users',UserSchema);

module.exports=UserModel;