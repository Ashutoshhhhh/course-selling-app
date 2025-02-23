const express=require('express');
const router=express.Router();
const auth = require('../middlewares/auth');
const {SignIn,SignUp,createCourse}=require('../controllers/adminController.js');

router.post('/signin',SignIn);
router.post('/signup',SignUp);
router.post('/createcourse',auth,createCourse);
module.exports=router;
