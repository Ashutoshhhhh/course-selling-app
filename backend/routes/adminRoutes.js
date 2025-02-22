const express=require('express');
const router=express.Router();
const auth = require('../middlewares/auth');
const {SignIn,SignUp}=require('../controllers/adminController.js');

router.post('/SignIn',SignIn);
router.post('/SignUp',SignUp);
module.exports=router;
