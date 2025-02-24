const auth=require('../middlewares/auth');
const express=require('express');
const router=express.Router();
const {courses} = require('../controllers/courseController.js');
const {signin,signup}=require('../controllers/userController.js');
const {userPurchases,purchasecourse}=require('../controllers/purchaseController');
router.post('/signin',signin);
router.post('/signup',signup);
router.get('/courses',auth, courses);
router.get('/userpurchases', auth,userPurchases);
router.post('/purchasecourse',auth,purchasecourse);
module.exports=router;


