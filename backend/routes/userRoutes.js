const auth=require('../middlewares/auth');
const express=require('express');
const router=express.Router();
const {signin,signup,userPurchases,courses,CoursePurchase}=require('../controllers/userController');

router.post('/signin',signin);
router.post('/signup',signup);
router.get('/userPurchases',auth,userPurchases)
router.post('/Course/Purchase',auth,CoursePurchase)
router.get('/courses',courses);
module.exports=router;


