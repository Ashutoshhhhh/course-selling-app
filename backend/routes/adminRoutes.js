const express=require('express');
const router=express.Router();
const auth = require('../middlewares/auth');
const {SignIn,SignUp,CreateCourse}=require('../controllers/adminController.js');

router.post('/SignIn',SignIn);
router.post('/SignUp',SignUp);
router.post('/createcourse',CreateCourse);
module.exports=router;
